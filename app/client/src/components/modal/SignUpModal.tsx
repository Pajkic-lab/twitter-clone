import React from 'react'
import Modal from 'react-modal'

export const SignUpModal = ({
  modalIsOpen,
  setModalIsOpen,
}: {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00'
  }

  function closeModal() {
    setModalIsOpen(false)
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button type="button" onClick={closeModal}>
          close
        </button>
        <div>I am a modal 123</div>
        <form>
          <input />
          <button type="button">tab navigation stays inside the modal</button>
        </form>
      </Modal>
    </>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
