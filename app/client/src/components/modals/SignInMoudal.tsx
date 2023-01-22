import { Cross } from '@styled-icons/entypo/Cross'
import { JumboButton } from 'ui/Button'
import Modal from 'styled-react-modal'
import styled from 'styled-components'
import { BaseInput } from 'ui/Input'
import { Colors } from 'ui/styles'
import React from 'react'

export const SignInModal = ({
  signInModalIsOpen,
  setSignInModalIsOpen,
}: {
  signInModalIsOpen: boolean
  setSignInModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const closeModal = () => {
    setSignInModalIsOpen(false)
  }
  return (
    <>
      <Modal isOpen={signInModalIsOpen} onBackgroundClick={closeModal}>
        <ModalSection>
          <Icon onClick={closeModal} />
          <H1>Sign in</H1>
          <Form>
            {/* <Input name={'Email'} />
            <Input name={'Password'} /> */}
            <SignUpButton>Sign In</SignUpButton>
          </Form>
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

const Form = styled.form``

const Input = styled(BaseInput)``

const SignUpButton = styled(JumboButton)`
  margin-top: 1.5rem;
`
