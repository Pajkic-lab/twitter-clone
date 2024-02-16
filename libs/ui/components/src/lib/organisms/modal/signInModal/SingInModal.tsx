import { zodResolver } from '@hookform/resolvers/zod';
import { Colors, Cross } from '@tw/ui/assets';
import { useSignInMutation } from '@tw/ui/data-access';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { JumboButton } from '../../../atoms/Button';
import { FormInput } from '../../../molecules/FormInput';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().max(20),
});

export type SignInFormData = z.infer<typeof signInSchema>;

type SingInModalProps = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignInModalContent = (props: SingInModalProps) => {
  const navigate = useNavigate();
  const signInMutation = useSignInMutation();

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

  const onSubmit = (signInFormData: SignInFormData) => {
    signInMutation.mutate(signInFormData);
    // navigate();
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
          <JumboButton loading={signInMutation.isPending} type="submit">
            Sign In
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