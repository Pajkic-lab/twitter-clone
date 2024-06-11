import Tippy from '@tippyjs/react/headless';
import { ConnectUser, PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { linksRecords } from '@tw/ui/common';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring } from 'react-spring';
import styled from 'styled-components';
import { ProfilePreviewTooltip } from '../organisms/profile/ProfilePreviewTooltip';
import { ConnectButton } from './ConnectButton';

type SingleUserProps = {
  buttonRelatedUser: PublicUserBase;
  meId: number;
  publicUserId?: number;
  connectButtonExist?: boolean;
  handleUserConnect: ConnectUser;
  isConnectPending?: boolean;
  showBio?: boolean;
  showConnectButton?: boolean;
  showUserPreview?: boolean;
};

export const SingleUser = (props: SingleUserProps) => {
  const {
    meId,
    publicUserId,
    buttonRelatedUser,
    handleUserConnect,
    isConnectPending,
    showBio = true,
    showConnectButton = true,
    showUserPreview = true,
  } = props;

  const { id, name, avatar, uniqueName, bio, followingStatus } =
    buttonRelatedUser;

  const navigate = useNavigate();

  const [showTooltipContent, setShowTooltipContent] = useState<boolean>(false);

  const config = { tension: 300, friction: 15 };
  const initialStyles = { opacity: 0, transform: 'scale(0.5)' };
  const [styleProps, setSpring] = useSpring(() => initialStyles);

  const goToUserPage = () => {
    if (meId === id) {
      return navigate(linksRecords.profilePage.base);
    }
    navigate(linksRecords.publicProfilePage.baseById(id));
  };

  function onMount() {
    setShowTooltipContent(true);
    setSpring({
      opacity: 1,
      transform: 'scale(1)',
      onRest: () => {},
      config,
      delay: 1000,
    });
  }

  function onHide({ unmount }: { unmount: any }) {
    if (unmount) {
      setSpring({
        ...initialStyles,
        onRest: unmount,
        config: { ...config, clamp: true },
      });
    }
  }

  // should this be extracted as separate component? is there a need for it???
  const TippyWrapper = ({ element }: { element: ReactNode }) => {
    return (
      <div>
        <Tippy
          interactive
          animation
          onMount={onMount}
          onHide={onHide}
          render={(attrs) =>
            showUserPreview && showTooltipContent ? (
              <ProfilePreviewTooltip
                {...attrs}
                styleProps={styleProps}
                buttonRelatedUser={buttonRelatedUser}
                meId={meId}
                publicUserId={publicUserId}
                isConnectPending={isConnectPending}
                handleUserConnect={handleUserConnect}
              />
            ) : (
              <></>
            )
          }
        >
          <div>{element}</div>
        </Tippy>
      </div>
    );
  };

  return (
    <Wrapper onClick={goToUserPage}>
      <TippyWrapper element={<ProfileImage $backgroundImage={avatar} />} />
      <ContentWrapper>
        <ProfileWrapper>
          <ContextWrapper>
            <TextWrapper>
              <H3>{name}</H3>
              <Span>{uniqueName}</Span>
            </TextWrapper>
          </ContextWrapper>
          {showConnectButton && (
            <ConnectButton
              meId={meId}
              buttonRelatedUserId={id}
              publicUserId={publicUserId}
              followingStatus={followingStatus}
              isConnectPending={isConnectPending}
              handleUserConnect={handleUserConnect}
            />
          )}
        </ProfileWrapper>
        {showBio && <S>{bio}</S>}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 0.8rem 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding-left: 0.8rem;
`;

const S = styled.span`
  color: ${colors.grayLight};
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ContextWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>`
  border-radius: 100%;
  width: 3.2rem;
  min-width: 3.2rem;
  height: 3.2rem;
  background-color: ${colors.bluePrimary};

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

const TextWrapper = styled.div``;

const H3 = styled.h3`
  margin: 0;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  color: ${colors.graySecondary};
  font-weight: 500;
`;
