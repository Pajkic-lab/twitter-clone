import { zodResolver } from '@hookform/resolvers/zod';
import { Cross } from '@styled-icons/entypo/Cross';
import { colors } from '@tw/ui/assets';
import { FormInput, InputComponent, JumboButton } from '@tw/ui/components';
import {
  signUpThunk,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

const signUpSchema = z
  .object({
    username: z.string().max(20),
    email: z.string().email(),
    password: z.string().max(20),
    confirmPassword: z.string().max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match',
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

interface Props {
  signUpModalIsOpen: boolean;
  setSignUpModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpModal: React.FC<Props> = ({
  signUpModalIsOpen,
  setSignUpModalIsOpen,
}) => {
  const dispatch = useAppDispatch();
  const { errorMessage, userIsSubmittingAuthData } = useAppSelector(
    (state) => state.auth
  );

  const { handleSubmit, control, formState, setError } =
    useForm<SignUpFormData>({
      resolver: zodResolver(signUpSchema),
      criteriaMode: 'all',
      mode: 'onBlur',
      defaultValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    });

  const closeModal = () => {
    setSignUpModalIsOpen(false);
    // on close modal reset global error message
  };

  const onSubmit = async (signUpformData: SignUpFormData) => {
    await dispatch(signUpThunk(signUpformData));
  };

  useEffect(() => {
    if (errorMessage) {
      setError('username', { type: 'server', message: errorMessage });
      setError('email', { type: 'server', message: errorMessage });
      setError('password', { type: 'server', message: errorMessage });
      setError('confirmPassword', { type: 'server', message: errorMessage });
    }
  }, [errorMessage]);

  return (
    <>
      <Modal isOpen={signUpModalIsOpen} onBackgroundClick={closeModal}>
        <ModalSection>
          <Icon onClick={closeModal} />
          <H1>Create your account</H1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              control={control}
              name="username"
              id={uuid()}
              type="text"
              required
            />
            <FormInput
              control={control}
              name="email"
              id={uuid()}
              type="text"
              required
            />
            <FormInput
              control={control}
              name="password"
              id={uuid()}
              type="password"
              required
            />
            <FormInput
              control={control}
              name="confirmPassword"
              id={uuid()}
              type="password"
              required
            />
            <SignUpButton loading={userIsSubmittingAuthData} type="submit">
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
  background-color: ${colors.black};
  color: ${colors.bluePrimary};
`;

const Icon = styled(Cross)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 36px;
  height: 30px;
  color: ${colors.grayLight};
  cursor: pointer;
`;

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.grayLight};
`;

const Form = styled.form``;

const Input = styled(InputComponent)``;

const SignUpButton = styled(JumboButton)`
  margin-top: 1.5rem;
`;
