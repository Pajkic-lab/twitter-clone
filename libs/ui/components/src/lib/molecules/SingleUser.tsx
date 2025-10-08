import Tippy from '@tippyjs/react';
import { PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { InvalidationData, linksRecords } from '@tw/ui/common';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ConnectButton } from '../atoms/ConnectButton';
import { ProfilePreview } from './ProfilePreview';

type SingleUserProps = {
  buttonRelatedUser: PublicUserBase;
  meId: number;
  publicUserId?: number;
  connectButtonExist?: boolean;
  showBio?: boolean;
  showConnectButton?: boolean;
  showUserPreview?: boolean;
  invData: InvalidationData;
};

export const SingleUser = (props: SingleUserProps) => {
  const {
    meId,
    publicUserId,
    buttonRelatedUser,
    showBio = true,
    showConnectButton = true,
    showUserPreview = true,
    invData,
  } = props;

  const { id, name, avatar, uniqueName, bio, followingStatus } = buttonRelatedUser;

  const navigate = useNavigate();

  const tippyOptions = {
    interactive: true,
    delay: [300, 0] as [number | null, number | null],
    hideOnClick: false,
  };

  const tippyContent = showUserPreview && (
    <div onClick={(e) => e.stopPropagation()}>
      <ProfilePreview
        buttonRelatedUser={buttonRelatedUser}
        meId={meId}
        publicUserId={publicUserId}
        invData={invData}
        showConnectButton={showConnectButton}
      />
    </div>
  );

  const goToUserPage = () => {
    if (meId === id) {
      return navigate(linksRecords.profilePage.base);
    }
    navigate(linksRecords.publicProfilePage.baseById(id));
  };

  return (
    <Wrapper onClick={goToUserPage}>
      <ContentWrapper>
        <ProfileWrapper>
          <Tippy
            {...tippyOptions}
            interactive
            delay={[300, 0]}
            hideOnClick={false}
            content={tippyContent}
          >
            <ContextWrapper>
              <ProfileImage $backgroundImage={avatar} />
              <TextWrapper>
                <H3>{name}</H3>
                <Span>{uniqueName}</Span>
              </TextWrapper>
            </ContextWrapper>
          </Tippy>
          {showConnectButton && (
            <ConnectButton
              meId={meId}
              buttonRelatedUserId={id}
              publicUserId={publicUserId}
              followingStatus={followingStatus}
              invData={invData}
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
  margin-right: 0.8rem;
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
