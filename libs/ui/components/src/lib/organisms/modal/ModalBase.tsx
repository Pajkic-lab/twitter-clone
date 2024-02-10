import { Colors } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';

type ModalProps = {
  description: string;
  children: ReactNode;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalBase = (props: ModalProps) => {
  const closeModal = () => {
    props.setModalIsOpen(false);
  };

  return (
    <Modal isOpen={props.modalIsOpen} onBackgroundClick={closeModal}>
      <Wrapper>
        <>{props.children}</>
      </Wrapper>
    </Modal>
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
