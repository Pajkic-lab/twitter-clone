import { PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { InvalidationData, linksRecords } from '@tw/ui/common';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ConnectButton } from '../atoms/ConnectButton';

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

  const { id, name, avatar, uniqueName, bio, followingStatus } =
    buttonRelatedUser;

  const navigate = useNavigate();

  const goToUserPage = () => {
    if (meId === id) {
      return navigate(linksRecords.profilePage.base);
    }
    navigate(linksRecords.publicProfilePage.baseById(id));
  };

  // UI is done, there is a problem with logic, list will reset on every update, and there is a problem how to
  // force window to open and close only on specific actions, and connect button propagation makes problems
  // const TippyWrapper = ({ element }: { element: ReactNode }) => {
  //   const [referenceElement, setReferenceElement] =
  //     useState<HTMLDivElement | null>(null);
  //   const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
  //     null
  //   );
  //   const [visible, setVisible] = useState(false);
  //   const [onPreview, setOnPreview] = useState(false);

  //   const { styles, attributes } = usePopper(referenceElement, popperElement, {
  //     modifiers: [{ name: 'arrow' }],
  //   });

  //   const showTooltip = () => {
  //     setTimeout(() => {
  //       setVisible(true);
  //     }, 1000);
  //   };

  //   const hideTooltip = () => {
  //     setTimeout(() => {
  //       setVisible(false);
  //     }, 1500);
  //   };

  //   const tooltipHovered = () => {
  //     setOnPreview(true);
  //   };

  //   const tooltipOff = () => {
  //     setOnPreview(false);
  //   };

  //   return (
  //     <>
  //       <div
  //         ref={setReferenceElement}
  //         onMouseEnter={showTooltip}
  //         onMouseLeave={hideTooltip}
  //       >
  //         {element}
  //       </div>

  //       {(visible || onPreview) && (
  //         <div
  //           onMouseEnter={tooltipHovered}
  //           onMouseLeave={tooltipOff}
  //           ref={setPopperElement}
  //           style={styles.popper}
  //           {...attributes.popper}
  //         >
  //           <ProfilePreviewTooltip
  //             meId={meId}
  //             buttonRelatedUser={buttonRelatedUser}
  //             publicUserId={publicUserId}
  //             invData={invData}
  //           />
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  return (
    <Wrapper onClick={goToUserPage}>
      <ProfileImage $backgroundImage={avatar} />
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
