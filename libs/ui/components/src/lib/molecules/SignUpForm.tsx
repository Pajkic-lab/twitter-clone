import { zodResolver } from '@hookform/resolvers/zod';
import { Colors } from '@tw/ui/assets';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { JumboButton } from '../atoms/Button';
import { FormInput } from './FormInput';

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

type SignUpModalProps = {
  onSubmit: (signUpFormData: SignUpFormData) => void;
  isPending: boolean;
  errorMessage?: string;
};

export const SignUpForm = (props: SignUpModalProps) => {
  const { onSubmit, isPending, errorMessage } = props;

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

  useEffect(() => {
    /**
     * 'root' for some reason does not work, this is why every field is set manually
     * should be refactored, weather use loop or find the other way to set error globally
     */
    setError('username', {
      message: errorMessage,
    });
    setError('email', {
      message: errorMessage,
    });
    setError('password', {
      message: errorMessage,
    });
    setError('confirmPassword', {
      message: errorMessage,
    });
  }, [errorMessage]);

  return (
    <ContentWrapper>
      <H1>Create your account</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          type="text"
          required
        />
        <FormInput
          control={control}
          name="confirmPassword"
          id={uuid()}
          type="text"
          required
        />
        <JumboButton loading={isPending} type="submit">
          Sign Up
        </JumboButton>
      </form>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  padding: 0 75px 25px 75px;
  width: 40rem;
`;

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${Colors.grayLight};
`;