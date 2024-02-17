import { zodResolver } from '@hookform/resolvers/zod';
import { Colors, Cross } from '@tw/ui/assets';
import { useSignUpMutation } from '@tw/ui/data-access';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { JumboButton } from '../../../atoms/Button';
import { FormInput } from '../../../molecules/FormInput';

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
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignUpModalContent = (props: SignUpModalProps) => {
  const signUpMutation = useSignUpMutation();

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

  const onSubmit = (signUpFormData: SignUpFormData) => {
    signUpMutation.mutate(signUpFormData);
  };

  return (
    <>
      <IconWrapper>
        <Icon onClick={() => props.setModalIsOpen(false)} />
      </IconWrapper>
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
            type="password"
            required
          />
          <FormInput
            control={control}
            name="confirmPassword"
            id={uuid()}
            type="text"
            required
          />
          <JumboButton loading={signUpMutation.isPending} type="submit">
            Sign Up
          </JumboButton>
        </form>
      </ContentWrapper>
    </>
  );
};

const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  padding: 1rem;
`;

const Icon = styled(Cross)`
  width: 2rem;
  height: 2rem;
  fill: ${Colors.white};
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  padding: 0 75px 25px 75px;
  width: 40rem;
`;

const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${Colors.grayLight};
`;
