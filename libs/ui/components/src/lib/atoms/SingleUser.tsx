import Tippy from '@tippyjs/react/headless';
import { ConnectUser, PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { linksRecords } from '@tw/ui/common';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring } from 'react-spring';
import styled from 'styled-components';
import { ConnectButton } from './ConnectButton';
import { UserPreviewTooltip } from './UserPreviewTooltip';

type SingleUserProps = {
  buttonRelatedUser: PublicUserBase;
  meId: number;
  publicUserId?: number;
  connectButtonExist?: boolean;
  handleUserConnect?: ConnectUser;
  isConnectPending?: boolean;
};

export const SingleUser = (props: SingleUserProps) => {
  const {
    meId,
    publicUserId,
    buttonRelatedUser,
    handleUserConnect,
    isConnectPending,
  } = props;

  const { id, name, avatar, uniqueName, followingStatus } = buttonRelatedUser;

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
    setSpring({
      ...initialStyles,
      onRest: unmount,
      config: { ...config, clamp: true },
    });
  }

  // should this be extracted as separate component? is there a need for it???
  const TippyWrapper = ({ element }: { element: ReactNode }) => {
    if (id === meId) return;

    return (
      <div>
        <Tippy
          interactive
          animation
          onMount={onMount}
          onHide={onHide}
          render={(attrs) =>
            showTooltipContent ? (
              <UserPreviewTooltip
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
    <ProfileButtonWrapper onClick={goToUserPage}>
      <ContextWrapper>
        <TippyWrapper element={<ProfileImage $backgroundImage={avatar} />} />
        <TextWrapper>
          <H3>{name}</H3>
          <Span>{uniqueName}</Span>
        </TextWrapper>
      </ContextWrapper>
      <ConnectButton
        meId={meId}
        buttonRelatedUserId={id}
        publicUserId={publicUserId}
        followingStatus={followingStatus}
        isConnectPending={isConnectPending}
        handleUserConnect={handleUserConnect}
      />
    </ProfileButtonWrapper>
  );
};

const ProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.8rem 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
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
  padding-left: 0.8rem;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.graySecondary};
  font-weight: 500;
`;
