import Modal from 'styled-react-modal'
import styled from 'styled-components'
import React from 'react'
import { Colors } from 'ui/styles'
import { Cross } from '@styled-icons/entypo/Cross'
import { BaseInput } from 'ui/OldInput'
import { FloatingInput } from 'ui/Input'
import { JumboButton } from 'ui/Button'

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
            <FloatingInput designation="Name" /> <br />
            <FloatingInput designation="Email" />
            <SignUpButton>Submit</SignUpButton>
          </form>
        </ModalSection>
      </Modal>
    </>
  )
}

const ModalSection = styled.div`
  position: relative;
  border-radius: 1rem;
  padding: 48px 75px 25px 75px;
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

const SignUpButton = styled(JumboButton)`
  margin-top: 3rem;
`
