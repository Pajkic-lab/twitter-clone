import { Colors, Cross } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';
import ModalBase from 'styled-react-modal';

type ModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasCloseButton?: boolean;
  actions?: ReactNode[];
  actionsPositionSticky?: ActionsPositionSticky;
  actionsContentAlinement: ActionsContentAlinement;
  children: ReactNode;
};

type ActionsPositionSticky = boolean;
type ActionsContentAlinement = 'left' | 'right' | 'center' | 'space-between';

export const Modal = (props: ModalProps) => {
  const {
    modalIsOpen,
    setModalIsOpen,
    hasCloseButton,
    actionsPositionSticky,
    actionsContentAlinement,
    actions,
    children,
  } = props;

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ModalBase isOpen={modalIsOpen} onBackgroundClick={closeModal}>
      <Wrapper>
        <WrapperActions actionsPositionSticky={actionsPositionSticky}>
          {hasCloseButton && <CloseButton onClick={closeModal} />}
          <WrapperActionsContent
            actionsContentAlinement={actionsContentAlinement}
          >
            {actions}
          </WrapperActionsContent>
        </WrapperActions>
        {children}
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
  z-index: 1;
  opacity: 100%;
  background-color: ${Colors.grayModalBackgroundShadow};
`;

const Wrapper = styled.div`
  background-color: ${Colors.black};
  border-radius: 1rem;
`;

const WrapperActions = styled.div<{
  actionsPositionSticky?: ActionsPositionSticky;
}>`
  // to be tested
  position: ${(props) => (props.actionsPositionSticky ? 'sticky' : 'static')};
  padding: 1rem;
  padding-right: 2.5rem;
  display: flex;
  align-items: center;
`;

const WrapperActionsContent = styled.div<{
  actionsContentAlinement: ActionsContentAlinement;
}>`
  width: 100%;
  display: flex;
  align-items: 'center';
  justify-content: ${(props) => props.actionsContentAlinement ?? 'center'};
  padding-left: 2.5rem;
`;

const CloseButton = styled(Cross)`
  width: 1.5rem;
  height: 1.5rem;
  fill: ${Colors.grayLight};
  cursor: pointer;
`;
