import Modal from 'styled-react-modal'
import styled from 'styled-components'
import React from 'react'
import { Colors } from 'ui/styles/styles'

export const SignUpModal = ({
  modalIsOpen,
  setModalIsOpen,
}: {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const closeModal = () => {
    setModalIsOpen(false)
  }
  return (
    <>
      <Modal isOpen={modalIsOpen} onBackgroundClick={closeModal}>
        <ModalSection>
          <span onClick={closeModal}>X</span>
          <h1>Create your account</h1>
          <form>
            <input placeholder="name" /> <br />
            <input placeholder="password" />
            <h5>Date of birth</h5>
            <span>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </span>
            <br />
            <select name="month" id="cars">
              <option value="jan">jan</option>
              <option value="feb">feb</option>
              <option value="mar">mar</option>
              <option value="apr">apr</option>
            </select>
            <select name="day" id="cars">
              <option>mon</option>
              <option>thu</option>
              <option>wen</option>
              <option>thr</option>
            </select>
            <select name="year" id="cars">
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
            </select>
          </form>
        </ModalSection>
      </Modal>
    </>
  )
}

const ModalSection = styled.div`
  border: 3px solid pink;
  padding: 15px 20px;
  background-color: ${Colors.black};
  color: ${Colors.primary};
`
