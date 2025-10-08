import { PublicUserBase } from '@tw/data';
import { InvalidationData, linksRecords } from '@tw/ui/common';
import { usePublicUserSocialStatsQuery } from '@tw/ui/data-access';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SecondaryButton } from '../../atoms/Button';
import { ConnectButton } from '../../atoms/ConnectButton';

type ProfilePreviewProps = {
  buttonRelatedUser: PublicUserBase;
  meId: number;
  publicUserId?: number;
  showConnectButton?: boolean;
  invData: InvalidationData;
};

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  buttonRelatedUser,
  meId,
  publicUserId,
  showConnectButton,
  invData,
}) => {
  const { id, name, avatar, uniqueName, bio, followingStatus } = buttonRelatedUser;
  const { data: socialStats } = usePublicUserSocialStatsQuery(id);
  const navigate = useNavigate();

  const truncate = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <Wrapper>
      <Popup>
        <Header>
          <ProfileImage
            data-testid="profile-avatar"
            $backgroundImage={avatar}
            onClick={() => navigate(linksRecords.publicProfilePage.baseById(id))}
          />
          {showConnectButton && (
            <ConnectButton
              meId={meId}
              buttonRelatedUserId={id}
              publicUserId={publicUserId}
              followingStatus={followingStatus}
              invData={invData}
            />
          )}
        </Header>

        <Content>
          <NameBlock>
            <NameLink
              data-testid="profile-name"
              onClick={() => navigate(linksRecords.publicProfilePage.baseById(id))}
            >
              {truncate(name ?? ``, 20)}
            </NameLink>
            <Handle>{uniqueName}</Handle>
          </NameBlock>
          <Bio data-testid="profile-bio">{truncate(bio ?? ``, 20)}</Bio>
          <Stats>
            <Stat>
              <Count>{socialStats?.followingCount ?? 0}</Count> <Label>Following</Label>
            </Stat>
            <Stat>
              <Count>{socialStats?.followersCount ?? 0}</Count> <Label>Followers</Label>
            </Stat>
          </Stats>

          <SecondaryButton onClick={() => console.log('click')}>Profile Summary</SecondaryButton>
        </Content>
      </Popup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Popup = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  padding: 20px 14px;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  /* subtle light shadow around the popup */
  box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(255, 255, 255, 0.1);
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>`
  border-radius: 100%;
  width: 70px;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.royalBlue};
  margin-right: 0.8rem;
  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color:${props.theme.colors.royalBlue};
  `}
`;

const NameBlock = styled.div``;

const Handle = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 14px;
`;

const Bio = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

const Stats = styled.div`
  margin-top: 8px;
  margin-bottom: 10px;
  display: flex;
  gap: 12px;
  font-size: 14px;
`;

const Stat = styled.div``;

const Count = styled.strong`
  color: ${({ theme }) => theme.colors.white};
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.gray};
`;

const Content = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-left: 6px;
`;

const NameLink = styled.div`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  font-size: 17px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
