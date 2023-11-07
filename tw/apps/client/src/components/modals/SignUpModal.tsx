import { Cross } from '@styled-icons/entypo/Cross';
import { useFormik, FormikHelpers } from 'formik';
import React, { useEffect } from 'react';
import Modal from 'styled-react-modal';
import styled from 'styled-components';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CreateUser } from '../../types';
import { signUpThunk } from '../../store/features/authSlice/thunk';
import { Colors } from '../../ui/styles';
import { BaseInput } from '../../ui/Input';
import { JumboButton } from '../../ui/Button';

interface Props {
  signUpModalIsOpen: boolean;
  setSignUpModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpModal: React.FC<Props> = ({
  signUpModalIsOpen,
  setSignUpModalIsOpen,
}) => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.auth);

  const closeModal = () => {
    setSignUpModalIsOpen(false);
    // on close modal reset global error message
  };

  const onSubmit = async (
    values: CreateUser,
    actions: FormikHelpers<CreateUser>
  ) => {
    await dispatch(signUpThunk(values));
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required!')
      .max(8, 'Name can not be longer then 8 characters'),
    email: yup
      .string()
      .required('Email is required!')
      .email('Please enter a valid email!'),
    password: yup.string().required('Password is required!'),
    // .matches(/[a-z]/, 'global.errors.mustHaveLowerCaseLetter')
    // .matches(/[A-Z]/, 'global.errors.mustHaveUpperCaseLetter')
    // .matches(/[0-9]/, 'global.errors.mustHaveNumber')
    // .matches(/[!#@$%^&*)(+=._-]/, 'global.errors.mustHaveSpecialCharacter')
    // .min(8, 'global.errors.minLenValidator'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf(
        [yup.ref('password'), null],
        'Confirm password and password are not eaqual!'
      ),
  });

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setErrors,
    isSubmitting,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (errorMessage) {
      setErrors({
        name: errorMessage,
        email: errorMessage,
        password: errorMessage,
        confirmPassword: errorMessage,
      });
    }
  }, [errorMessage]);

  return (
    <>
      <Modal isOpen={signUpModalIsOpen} onBackgroundClick={closeModal}>
        <ModalSection>
          <Icon onClick={closeModal} />
          <H1>Create your account</H1>
          <Form onSubmit={handleSubmit}>
            <Input
              id={'name'}
              type={'name'}
              name={'Name'}
              value={values.name}
              error={errors.name}
              touched={touched.name}
              onBlure={handleBlur}
              handleChange={handleChange}
            />
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
            <Input
              id={'confirmPassword'}
              type={'password'}
              name={'Confirm Password'}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              onBlure={handleBlur}
              handleChange={handleChange}
            />
            <SignUpButton type="submit" loading={isSubmitting}>
              Sign Up
            </SignUpButton>
          </Form>
        </ModalSection>
      </Modal>
    </>
  );
};

const ModalSection = styled.div`
  position: relative;
  border-radius: 1rem;
  padding: 48px 75px 25px 75px;
  background-color: ${Colors.black};
  color: ${Colors.primary};
`;

const Icon = styled(Cross)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 36px;
  height: 30px;
  color: ${Colors.lighterGray};
  cursor: pointer;
`;

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${Colors.lighterGray};
`;

const Form = styled.form``;

const Input = styled(BaseInput)``;

const SignUpButton = styled(JumboButton)`
  margin-top: 1.5rem;
`;