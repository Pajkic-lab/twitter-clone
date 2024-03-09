import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@tw/ui/assets';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { JumboButton } from '../atoms/Button';
import { FormInput } from './FormInput';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().max(20),
});

export type SignInFormData = z.infer<typeof signInSchema>;

type SingInFormProps = {
  onSubmit: (signInFormData: SignInFormData) => void;
  isPending: boolean;
  error: Error | null;
};

export const SignInForm = (props: SingInFormProps) => {
  const { onSubmit, isPending, error } = props;

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

  useEffect(() => {
    /**
     * 'root' for some reason does not work, this is why every field is set manually
     * should be refactored, weather use loop or find the other way to set error globally
     */
    setError('email', {
      message: error?.message,
    });
    setError('password', {
      message: error?.message,
    });
  }, [error]);

  return (
    <>
      <H1>Sign in to Twitter</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <JumboButton loading={isPending} type="submit">
          Sign In
        </JumboButton>
      </form>
    </>
  );
};

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.grayLight};
`;
