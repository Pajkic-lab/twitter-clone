import { Cross } from '@styled-icons/entypo/Cross';
import { useFormik, FormikHelpers } from 'formik';
import React, { useEffect } from 'react';
import Modal from 'styled-react-modal';
import styled from 'styled-components';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signInThunk } from '../../store/features/authSlice/thunk';
import { Colors } from '../../ui/styles';
import { BaseInput } from '../../ui/Input';
import { JumboButton } from '../../ui/Button';
import { ConfirmUserDto } from '@tw/data';

interface Props {
  signInModalIsOpen: boolean;
  setSignInModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInModal: React.FC<Props> = ({
  signInModalIsOpen,
  setSignInModalIsOpen,
}) => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector((state) => state.auth);

  const closeModal = () => {
    setSignInModalIsOpen(false);
    // on close modal reset global error message
  };

  const onSubmit = async (
    values: ConfirmUserDto,
    actions: FormikHelpers<ConfirmUserDto>
  ) => {
    await dispatch(signInThunk(values));
  };

  const validationSchema = yup.object().shape({
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
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (errorMessage) {
      setErrors({ email: errorMessage, password: errorMessage });
    }
  }, [errorMessage]);

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

const SignInButton = styled(JumboButton)`
  margin-top: 1.5rem;
`;
