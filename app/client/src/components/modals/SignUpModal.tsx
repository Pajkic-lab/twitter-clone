import Modal from 'styled-react-modal'
import styled from 'styled-components'
import React from 'react'
import { Colors } from 'ui/styles/styles'
import { Cross } from '@styled-icons/entypo/Cross'
import { BaseInput } from 'ui/Input'

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
          <Icon onClick={closeModal} />
          <H1>Create your account</H1>
          <form>
            <BaseInput placeholder="Name" /> <br />
            <BaseInput placeholder="Email" />
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
  position: relative;
  border-radius: 1rem;
  padding: 48px 75px 20px 75px;
  background-color: ${Colors.black};
  color: ${Colors.primary};
`

const Icon = styled(Cross)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 36px;
  height: 30px;
  color: ${Colors.lighterGray};
  cursor: pointer;
`

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${Colors.lighterGray};
`
