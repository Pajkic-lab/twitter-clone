import { PublicUserBase } from '@tw/data';
import { InvalidationData, linksRecords } from '@tw/ui/common';
import { ConnectButton, SecondaryButton } from '@tw/ui/components';
import { usePublicUserSocialStatsQuery } from '@tw/ui/data-access';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

type ProfilePreviewProps = {
  displayedUser: PublicUserBase;
  meId: string;
  publicUserId?: string;
  invData: InvalidationData;
};

export function ProfilePreview(props: ProfilePreviewProps) {
  const { displayedUser, meId, publicUserId, invData } = props;
  const { id, name, avatar, uniqueName, bio, followingStatus } = displayedUser;
  const { data: socialStats } = usePublicUserSocialStatsQuery(id);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate(linksRecords.publicProfilePage.baseById(id));
  };

  const followingCount = socialStats?.followingCount;
  const followersCount = socialStats?.followersCount;

  return (
    <Popup>
      <Header>
        <ProfileImage $backgroundImage={avatar} onClick={handleAvatarClick} />
        <ConnectButton
          meId={meId}
          buttonRelatedUserId={id}
          publicUserId={publicUserId}
          followingStatus={followingStatus}
          invData={invData}
        />
      </Header>

      <ProfileDetailsWrapper>
        <NameWrapper>
          <NameLink onClick={handleAvatarClick}>{name}</NameLink>
          <Handle>{uniqueName}</Handle>
        </NameWrapper>
        <Bio>{bio}</Bio>
        <Stats>
          <div>
            <Count>{followingCount}</Count> <Label>Following</Label>
          </div>
          <div>
            <Count>{followersCount}</Count> <Label>Followers</Label>
          </div>
        </Stats>

        <SecondaryButton>Profile Summary</SecondaryButton>
      </ProfileDetailsWrapper>
    </Popup>
  );
}

const Popup = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: ${theme.spacing[0.75]};
    padding: ${theme.spacing[1.5]} ${theme.spacing[1]};
    width: 300px;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    border-radius: ${theme.radii.lg};
    box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(255, 255, 255, 0.1);
  `,
);

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>(
  ({ theme, $backgroundImage }) =>
    css`
      border-radius: 100%;
      width: 64px;
      height: 64px;
      background-color: ${theme.colors.royalBlue};
      margin-right: ${theme.spacing[0.75]};

      ${$backgroundImage
        ? `
      background-image: url(${$backgroundImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: ${theme.colors.royalBlue};
    `
        : ''}
    `,
);

const Handle = styled.div(
  ({ theme }) => css`
    color: ${theme.colors.gray};
    font-size: ${theme.typography.fontSizes.base};
    word-wrap: break-word;
    overflow-wrap: break-word;
  `,
);

const Bio = styled.div(
  ({ theme }) => css`
    margin-top: ${theme.spacing[0.625]};
    font-size: ${theme.typography.fontSizes.lg};
    color: ${theme.colors.white};
    word-wrap: break-word;
    max-width: 100%;
  `,
);

const Stats = styled.div(
  ({ theme }) => css`
    margin-top: ${theme.spacing[0.625]};
    margin-bottom: ${theme.spacing[0.75]};
    display: flex;
    gap: ${theme.spacing[0.875]};
    font-size: ${theme.typography.fontSizes.base};
  `,
);

const Count = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.typography.fontWeight.bold};
  `,
);

const Label = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.gray};
  `,
);

const ProfileDetailsWrapper = styled.div(
  ({ theme }) => css`
    margin-top: ${theme.spacing[0.625]};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing[0.25]};
    margin-left: ${theme.spacing[0.375]};
  `,
);

const NameWrapper = styled.div`
  word-wrap: break-word;
  max-width: 100%;
`;

const NameLink = styled.a(
  ({ theme }) => css`
    color: ${theme.colors.white};
    text-decoration: none;
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `,
);
