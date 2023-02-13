import { signInThunk } from 'store/features/authSlice/thunk'
import { Cross } from '@styled-icons/entypo/Cross'
import { FormikHelpers, useFormik } from 'formik'
import { useAppDispatch } from 'store/hooks'
import { JumboButton } from 'ui/Button'
import Modal from 'styled-react-modal'
import styled from 'styled-components'
import { BaseInput } from 'ui/Input'
import { VerifyUser } from 'types'
import { Colors } from 'ui/styles'
import * as yup from 'yup'
import React from 'react'

interface Props {
  signInModalIsOpen: boolean
  setSignInModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignInModal: React.FC<Props> = ({ signInModalIsOpen, setSignInModalIsOpen }) => {
  const dispatch = useAppDispatch()

  const closeModal = () => {
    setSignInModalIsOpen(false)
  }

  const onSubmit = async (values: VerifyUser, actions: FormikHelpers<VerifyUser>) => {
    await dispatch(signInThunk(values))
    actions.resetForm()
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required!').email('Please enter a valid email!'),
    password: yup.string().required('Password is required!'),
    // .matches(/[a-z]/, 'global.errors.mustHaveLowerCaseLetter')
    // .matches(/[A-Z]/, 'global.errors.mustHaveUpperCaseLetter')
    // .matches(/[0-9]/, 'global.errors.mustHaveNumber')
    // .matches(/[!#@$%^&*)(+=._-]/, 'global.errors.mustHaveSpecialCharacter')
    // .min(8, 'global.errors.minLenValidator'),
  })

  const { handleSubmit, handleBlur, handleChange, isSubmitting, errors, touched, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <>
      <Modal isOpen={signInModalIsOpen} onBackgroundClick={closeModal}>
        <ModalSection>
          <Icon onClick={closeModal} />
          <H1>Sign in</H1>
          <Form onSubmit={handleSubmit}>
            <Input
              id={'email'}
              type={'email'}
              name={'Email'}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              onBlure={handleBlur}
              handleChange={handleChange}
            />
            <Input
              id={'password'}
              type={'password'}
              name={'Password'}
              value={values.password}
              error={errors.password}
              touched={touched.password}
              onBlure={handleBlur}
              handleChange={handleChange}
            />
            <SignInButton loading={isSubmitting} type="submit">
              Sign In
            </SignInButton>
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

const SignInButton = styled(JumboButton)`
  margin-top: 1.5rem;
`
