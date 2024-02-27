import { zodResolver } from '@hookform/resolvers/zod';
import { Colors } from '@tw/ui/assets';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { JumboButton } from '../atoms/Button';
import { FormInput } from './FormInput';

type SetAccountFormProps = {
  onSubmit: (uniqueNameFormData: UniqueNameFormData) => void;
  onChange: (uniqueName: string) => void;
  isUniqueNameChecking: boolean;
  isFormSubmitting: boolean;
  isNameUnique: boolean;
};

const uniqueNameSchema = z.object({
  uniqueName: z.string().startsWith('@').min(4).max(8),
});

export type UniqueNameFormData = z.infer<typeof uniqueNameSchema>;

export const SetAccountForm = (props: SetAccountFormProps) => {
  const {
    onSubmit,
    onChange,
    isFormSubmitting,
    isNameUnique,
    isUniqueNameChecking,
  } = props;

  const { handleSubmit, control, formState, setError, clearErrors } =
    useForm<UniqueNameFormData>({
      resolver: zodResolver(uniqueNameSchema),
      criteriaMode: 'all',
      mode: 'all',
      defaultValues: {
        uniqueName: '',
      },
    });

  const { uniqueName } = useWatch({ control });
  const { isValid } = formState;

  const isLoading = useMemo(
    () => isFormSubmitting || isUniqueNameChecking,
    [isFormSubmitting, isUniqueNameChecking]
  );
  const nameNotApproved = useMemo(
    () => !isNameUnique || !isValid || isLoading,
    [isNameUnique, isValid, isLoading]
  );

  useEffect(() => {
    if (isValid && uniqueName) onChange(uniqueName);
  }, [isValid, uniqueName]);

  /**
   * Set error is causing problems don't have time to resolve it...
   */

  // useEffect(() => {
  //   clearErrors();
  //   if (nameNotApproved && uniqueName) {
  //     setError('uniqueName', {
  //       type: 'server',
  //       message: `Name ${uniqueName} is already taken`,
  //     });
  //   }
  // }, [nameNotApproved, uniqueName]);

  return (
    <ModalSection>
      <H1>What should we call you?</H1>
      <H5>Your @username is unique. You can always change it later.</H5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control}
          name="uniqueName"
          id={uuid()}
          type="text"
          required
        />
        <JumboButton
          type="submit"
          disabled={nameNotApproved}
          loading={isLoading}
        >
          Join us
        </JumboButton>
      </form>
    </ModalSection>
  );
};

const ModalSection = styled.div`
  position: relative;
  border-radius: 1rem;
  padding: 0 75px 25px 75px;
  background-color: ${Colors.black};
`;

const H1 = styled.h1`
  color: ${Colors.white};
  font-size: xx-large;
  font-weight: 700;
  margin-bottom: 0;
`;

const H5 = styled.h4`
  color: ${Colors.graySecondary};
  margin-top: 0.4rem;
  margin-bottom: 2.4rem;
`;
