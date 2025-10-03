import { PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets'; // use your project's color palette
import { InvalidationData } from '@tw/ui/common';
import { usePublicUserSocialStatsQuery } from '@tw/ui/data-access';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ConnectButton } from '../atoms/ConnectButton';
import { ProfileSummaryButton } from '../atoms/ProfileSummaryButton';

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

  return (
    <Wrapper>
      <Popup>
        <Header>
          <Avatar src={avatar} alt={name} />
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
            <NameLink to={`/public-profile/${id}`}>{name}</NameLink>
            <Handle>{uniqueName}</Handle>
          </NameBlock>
          <Bio>{bio}</Bio>
          <Stats>
            <Stat>
              <Count>{socialStats?.followingCount}</Count> <Label>Following</Label>
            </Stat>
            <Stat>
              <Count>{socialStats?.followersCount}</Count> <Label>Followers</Label>
            </Stat>
          </Stats>

          <ProfileSummaryButton onClick={() => console.log('click')} />
        </Content>
      </Popup>
    </Wrapper>
  );
};

// ================= Styled Components =================

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
  background: ${colors.black};
  color: ${colors.white};
  border-radius: 16px;
  /* subtle light shadow around the popup */
  box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(255, 255, 255, 0.1);
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const NameBlock = styled.div``;

const Handle = styled.div`
  color: ${colors.graySecondary};
  font-size: 14px;
`;

const Bio = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: ${colors.white};
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
  color: ${colors.white};
`;

const Label = styled.span`
  color: ${colors.graySecondary};
`;

const Content = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-left: 6px;
`;

const NameLink = styled(Link)`
  color: ${colors.white};
  text-decoration: none;
  font-size: 17px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
