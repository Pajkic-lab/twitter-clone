import { PublicUserBase } from '@tw/data';
import { InvalidationData, linksRecords } from '@tw/ui/common';
import { ConnectButton, SecondaryButton } from '@tw/ui/components';
import { usePublicUserSocialStatsQuery } from '@tw/ui/data-access';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type ProfilePreviewProps = {
  displayedUser: PublicUserBase;
  meId: string;
  publicUserId?: string;
  showConnectButton?: boolean;
  invData: InvalidationData;
};

export function ProfilePreview({
  displayedUser,
  meId,
  publicUserId,
  showConnectButton,
  invData,
}: ProfilePreviewProps) {
  const { id, name, avatar, uniqueName, bio, followingStatus } = displayedUser;
  const { data: socialStats } = usePublicUserSocialStatsQuery(id);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate(linksRecords.publicProfilePage.baseById(id));
  };

  const followingCount = socialStats?.followingCount ?? 0;
  const followersCount = socialStats?.followersCount ?? 0;

  const connectButton = showConnectButton ? (
    <ConnectButton
      meId={meId}
      buttonRelatedUserId={id}
      publicUserId={publicUserId}
      followingStatus={followingStatus}
      invData={invData}
    />
  ) : null;

  return (
    <Popup>
      <Header>
        <ProfileImage $backgroundImage={avatar} onClick={handleAvatarClick} />
        {connectButton}
      </Header>

      <ProfileDetailsWrapper>
        <NameWrapper>
          {/* //truncate */}
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

const Popup = styled.div(({ theme }) => {
  const { black, white } = theme.colors;
  const { 0.75: mt, 1.5: pY, 1: pX } = theme.spacing;
  const { lg } = theme.radii;

  return `
    display: flex;
    flex-direction: column;
    margin-top: ${mt};
    padding: ${pY} ${pX};
    width: 300px;
    background-color: ${black};
    color: ${white};
    border-radius:${lg};
    box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.2),
                0 4px 12px rgba(255, 255, 255, 0.1);
  `;
});

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>(({ theme, $backgroundImage }) => {
  const { royalBlue } = theme.colors;
  const { 0.75: mr } = theme.spacing;

  return `
    border-radius: 100%;
    width: 64px;
    height: 64px;
    background-color: ${royalBlue};
    margin-right: ${mr};

    ${
      $backgroundImage
        ? `
      background-image: url(${$backgroundImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: ${royalBlue};
    `
        : ''
    }
  `;
});

const Handle = styled.div(({ theme }) => {
  const { base } = theme.typography.fontSizes;
  const { gray } = theme.colors;
  return `
    color: ${gray};
    font-size: ${base};

    word-wrap: break-word;
    overflow-wrap: break-word;
  `;
});

const Bio = styled.div(({ theme }) => {
  const { white } = theme.colors;
  const { 0.625: mt } = theme.spacing;
  const { lg } = theme.typography.fontSizes;

  return `
    margin-top: ${mt};
    font-size: ${lg};
    color: ${white};

    word-wrap: break-word;
    max-width: 100%;

  `;
});

const Stats = styled.div(({ theme }) => {
  const { 0.625: mt, 0.75: mb, 0.875: gap } = theme.spacing;
  const { base } = theme.typography.fontSizes;

  return `
    margin-top: ${mt};
    margin-bottom: ${mb};
    display: flex;
    gap: ${gap};
    font-size: ${base};
  `;
});

const Count = styled.span(({ theme }) => {
  const { white } = theme.colors;
  const { bold } = theme.typography.fontWeight;

  return `
    color: ${white};
    font-weight: ${bold};

  `;
});

const Label = styled.span(({ theme }) => {
  const { gray } = theme.colors;
  return `
    color: ${gray};
  `;
});

const ProfileDetailsWrapper = styled.div(({ theme }) => {
  const { 0.625: mt, 0.25: gap, 0.375: ml } = theme.spacing;
  return `
    margin-top:  ${mt};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${gap};
    margin-left: ${ml};
    
  `;
});

const NameWrapper = styled.div`
  word-wrap: break-word;
  max-width: 100%;
`;

const NameLink = styled.a(({ theme }) => {
  const { lg } = theme.typography.fontSizes;
  const { white } = theme.colors;
  return `
    color: ${white};
    text-decoration: none;
    font-size: ${lg};
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `;
});
