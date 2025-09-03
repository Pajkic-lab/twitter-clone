import { colors, CrossIcon } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';
import ModalBase from 'styled-react-modal';

type ModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  heightFixed?: boolean;
  hasCloseButton?: boolean;
  actionsPositionSticky?: ActionsPositionSticky;
  actionsContentAlinement: ActionsContentAlinement;
  actions?: ReactNode[];
  children: ReactNode;
};

type ActionsPositionSticky = boolean;
type ActionsContentAlinement = 'left' | 'right' | 'center' | 'space-between';

export const Modal = (props: ModalProps) => {
  const {
    modalIsOpen,
    setModalIsOpen,
    heightFixed = false,
    hasCloseButton = false,
    actionsPositionSticky = false,
    actionsContentAlinement,
    actions,
    children,
  } = props;

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ModalBase isOpen={modalIsOpen} onBackgroundClick={closeModal}>
      <Wrapper heightFixed={heightFixed}>
        <ActionsWrapper
          hasCloseButton={hasCloseButton}
          actionsPositionSticky={actionsPositionSticky}
        >
          {hasCloseButton && <CloseButton onClick={closeModal} />}
          <ActionsContentWrapper
            hasCloseButton={hasCloseButton}
            actionsContentAlinement={actionsContentAlinement}
          >
            {actions}
          </ActionsContentWrapper>
        </ActionsWrapper>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Wrapper>
    </ModalBase>
  );
};

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  opacity: 100%;
  background-color: ${colors.grayModalBackgroundShadow};
`;

const Wrapper = styled.div<{ heightFixed: boolean }>`
  overflow-y: ${({ heightFixed }) => heightFixed && 'scroll'};
  height: ${({ heightFixed }) => heightFixed && '65vh'};
  width: 40rem;
  border-radius: 1rem;
  background-color: ${colors.black};
`;

const ActionsWrapper = styled.div<{
  hasCloseButton: boolean;
  actionsPositionSticky: ActionsPositionSticky;
}>`
  position: ${({ actionsPositionSticky }) => (actionsPositionSticky ? 'sticky' : 'static')};
  backdrop-filter: ${({ actionsPositionSticky }) => actionsPositionSticky && 'blur(10px)'};
  top: 0;
  padding: 1rem;
  padding-right: ${({ hasCloseButton }) => hasCloseButton && '3.5rem'};
  display: flex;
  align-items: center;
  z-index: 2;
`;

const ActionsContentWrapper = styled.div<{
  hasCloseButton: boolean;
  actionsContentAlinement: ActionsContentAlinement;
}>`
  width: 100%;
  display: flex;
  justify-content: ${({ actionsContentAlinement }) => actionsContentAlinement ?? 'center'};
  align-items: center;
  padding-left: ${({ hasCloseButton }) => hasCloseButton && '3rem'};
`;

const CloseButton = styled(CrossIcon)`
  width: 1.5rem;
  height: 1.5rem;
  fill: ${colors.grayLight};
  cursor: pointer;
`;

const ChildrenWrapper = styled.div`
  padding: 0 75px 25px 75px;
`;
