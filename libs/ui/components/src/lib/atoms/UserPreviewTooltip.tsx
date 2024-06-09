import { ConnectUser, PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { usePublicUserSocialStatsQuery } from '@tw/ui/data-access';
import { SpringValue, animated } from 'react-spring';
import styled from 'styled-components';
import { SocialStats } from '../organisms/profile/components/SocialStats';
import { ConnectButton } from './ConnectButton';

type UserPreviewTooltipProps = {
  buttonRelatedUser: PublicUserBase;
  styleProps: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  meId: number;
  publicUserId?: number;
  isConnectPending?: boolean;
  handleUserConnect?: ConnectUser;
};

export const UserPreviewTooltip = (props: UserPreviewTooltipProps) => {
  const {
    buttonRelatedUser,
    styleProps,
    meId,
    publicUserId,
    isConnectPending,
    handleUserConnect,
  } = props;

  const { id, avatar, followingStatus, name, uniqueName, bio } =
    buttonRelatedUser;

  const { data: socialStats } = usePublicUserSocialStatsQuery(id);

  return (
    <WrapperAnimated style={styleProps}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <TopSectionWrapper>
          <ProfileImage $backgroundImage={avatar} />
          <ConnectButton
            meId={meId}
            buttonRelatedUserId={id}
            publicUserId={publicUserId}
            followingStatus={followingStatus}
            isConnectPending={isConnectPending}
            handleUserConnect={handleUserConnect}
          />
        </TopSectionWrapper>

        {/* should this be reused from profile component??? it could be */}
        <TextWrapper>
          <H2Bio>{name}</H2Bio>
          <SpanBio>{uniqueName}</SpanBio>
        </TextWrapper>
        <SpanTextWrapper>
          <SpanText>{bio}</SpanText>
        </SpanTextWrapper>

        <SocialStats socialStats={socialStats} />
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
  /* align-items: center; */
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

const TextWrapper = styled.div`
  padding-bottom: 1rem;
`;

const H2Bio = styled.h2`
  margin: 0;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const SpanBio = styled.span`
  color: ${colors.graySecondary};
  font-weight: 500;
`;

const SpanTextWrapper = styled.div`
  padding-bottom: 1rem;
`;

const SpanText = styled.span`
  color: ${colors.white};
  overflow-wrap: break-word;
`;
