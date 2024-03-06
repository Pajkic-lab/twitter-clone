import { zodResolver } from '@hookform/resolvers/zod';
import { Cross } from '@styled-icons/entypo/Cross';
import { colors } from '@tw/ui/assets';
import { FormInput, InputComponent, JumboButton } from '@tw/ui/components';
import {
  signInThunk,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().max(20),
});

export type SignInFormData = z.infer<typeof signInSchema>;

interface Props {
  signInModalIsOpen: boolean;
  setSignInModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInModal: React.FC<Props> = ({
  signInModalIsOpen,
  setSignInModalIsOpen,
}) => {
  const dispatch = useAppDispatch();
  const { errorMessage, userIsSubmittingAuthData } = useAppSelector(
    (state) => state.auth
  );

  const { handleSubmit, control, formState, setError } =
    useForm<SignInFormData>({
      resolver: zodResolver(signInSchema),
      criteriaMode: 'all',
      mode: 'onBlur',
      defaultValues: {
        email: '',
        password: '',
      },
    });

  const closeModal = () => {
    setSignInModalIsOpen(false);
    // on close modal reset global error message
  };

  const onSubmit = async (signInformData: SignInFormData) => {
    await dispatch(signInThunk(signInformData));
  };

  useEffect(() => {
    if (errorMessage) {
      setError('email', { type: 'server', message: errorMessage });
      setError('password', { type: 'server', message: errorMessage });
    }
  }, [errorMessage]);

  return (
    <>
      <Modal isOpen={signInModalIsOpen} onBackgroundClick={closeModal}>
        <ModalSection>
          <Icon onClick={closeModal} />
          <H1>Sign in</H1>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
            <SignInButton loading={userIsSubmittingAuthData} type="submit">
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

const SignInButton = styled(JumboButton)`
  margin-top: 1.5rem;
`;
