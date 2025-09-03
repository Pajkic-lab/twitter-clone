import { PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { InvalidationData, linksRecords } from '@tw/ui/common';
import { usePublicUserSocialStatsQuery } from '@tw/ui/data-access';
import { useNavigate } from 'react-router-dom';
import { animated } from 'react-spring';
import styled from 'styled-components';
import { ConnectButton } from '../../atoms/ConnectButton';
import { NameAndUniquename } from './components/NameAndUniquename';
import { SocialStats } from './components/SocialStats';

type UserPreviewTooltipProps = {
  meId: number;
  buttonRelatedUser: PublicUserBase;
  publicUserId?: number;
  invData: InvalidationData;
};

export const ProfilePreviewTooltip = (props: UserPreviewTooltipProps) => {
  const { buttonRelatedUser, meId, publicUserId, invData } = props;

  const { id, avatar, followingStatus, name, uniqueName, bio } = buttonRelatedUser;

  const navigate = useNavigate();

  const { data: socialStats } = usePublicUserSocialStatsQuery(id);

  const goToUserPage = () => {
    if (id === meId) return navigate(linksRecords.profilePage.base);
    navigate(linksRecords.publicProfilePage.baseById(id));
  };

  return (
    <WrapperAnimated>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <TopSectionWrapper>
          <ProfileImage $backgroundImage={avatar} onClick={goToUserPage} />
          <ConnectButton
            meId={meId}
            buttonRelatedUserId={id}
            publicUserId={publicUserId}
            followingStatus={followingStatus}
            invData={invData}
          />
        </TopSectionWrapper>

        <NameAndUniquename
          name={name}
          uniqueName={uniqueName}
          bio={bio}
          navigateToUser={goToUserPage}
        />

        <SocialStats socialStats={socialStats} socialStatsUserId={id} />
      </div>
    </WrapperAnimated>
  );
};

const WrapperAnimated = styled(animated.div)`
  width: 21.429rem;
  padding: 1.1rem;
  border-radius: 1rem;
  box-shadow: 0 0 8px hsla(0, 100%, 99.2156862745098%, 0.738);
  background-color: ${colors.black};
  cursor: default;
`;

const TopSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>`
  border-radius: 100%;
  width: 4rem;
  height: 4rem;
  background-color: ${colors.bluePrimary};
  cursor: pointer;

  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${colors.black};
  `}
`;
