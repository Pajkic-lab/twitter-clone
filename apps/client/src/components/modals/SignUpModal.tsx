import { Cross } from '@styled-icons/entypo/Cross';
import { SignUpEmailRequestDto } from '@tw/data';
import { Colors } from '@tw/ui/assets';
import {
  signUpThunk,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import { FormikHelpers, useFormik } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import * as yup from 'yup';
// import { JumboButton } from '../../ui/Button';
import { JumboButton } from '@tw/ui/components';
import { BaseInput } from '../../ui/Input';

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
    values: SignUpEmailRequestDto,
    actions: FormikHelpers<SignUpEmailRequestDto>
  ) => {
    await dispatch(signUpThunk(values));
  };

  const validationSchema = yup.object().shape({
    username: yup
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
      username: '',
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
        username: errorMessage,
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
              id={'username'}
              type={'username'}
              name={'Username'}
              value={values.username}
              error={errors.username}
              touched={touched.username}
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
  color: ${Colors.bluePrimary};
`;

const Icon = styled(Cross)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 36px;
  height: 30px;
  color: ${Colors.grayLight};
  cursor: pointer;
`;

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${Colors.grayLight};
`;

const Form = styled.form``;

const Input = styled(BaseInput)``;

const SignUpButton = styled(JumboButton)`
  margin-top: 1.5rem;
`;
