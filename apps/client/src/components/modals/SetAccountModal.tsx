import { zodResolver } from '@hookform/resolvers/zod';
import { SocialTwitter } from '@styled-icons/foundation/SocialTwitter';
import { Colors } from '@tw/ui/assets';
import { FormInput, InputComponent, JumboButton } from '@tw/ui/components';
import {
  checkNameUniqueness,
  updateUserUniqueName,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

const uniqueNameSchema = z.object({
  uniqueName: z.string().startsWith('@').min(3).max(8),
});

export type UniqueNameFormData = z.infer<typeof uniqueNameSchema>;

export const SetAccountModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isNameUnique, uniqueName, uniqueNameIsSubmitting } = useAppSelector(
    (state) => state.auth
  );

  const { handleSubmit, control, formState, setError } =
    useForm<UniqueNameFormData>({
      resolver: zodResolver(uniqueNameSchema),
      criteriaMode: 'all',
      mode: 'onChange',
      defaultValues: {
        uniqueName: '',
      },
    });

  const formData = useWatch({ control });

  const { errors, isDirty } = formState;

  const onSubmit = async (uniqueName: UniqueNameFormData) => {
    if (isNameUnique && !errors.uniqueName) {
      await dispatch(updateUserUniqueName(uniqueName));
    }
  };

  useEffect(() => {
    if (formData.uniqueName) {
      void dispatch(checkNameUniqueness({ uniqueName: formData.uniqueName }));
    }
    if (!isNameUnique && isDirty) {
      // error is not being displayed for some reason when there is error, why idk...
      setError('uniqueName', {
        type: 'server',
        message: 'Name is already taken',
      });
    }
  }, [formData, isNameUnique, isDirty]);

  return (
    <Modal isOpen={!uniqueName}>
      <ModalSection>
        <LogoWrapper>
          <LogoSvg />
        </LogoWrapper>
        <H1>What should we call you?</H1>
        <H5>Your @username is unique. You can always change it later.</H5>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            name="uniqueName"
            id={uuid()}
            type="text"
            required
          />
          <Button
            type="submit"
            loading={uniqueNameIsSubmitting}
            disabled={isNameUnique && !errors.uniqueName ? false : true}
          >
            Join us
          </Button>
        </Form>
      </ModalSection>
    </Modal>
  );
};

const ModalSection = styled.div`
  position: relative;
  border-radius: 1rem;
  padding: 25px 75px 25px 75px;
  background-color: ${Colors.black};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoSvg = styled(SocialTwitter)`
  width: 40px;
  height: 40px;
  color: ${Colors.grayPrimary};
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

const Form = styled.form``;

const Input = styled(InputComponent)``;

const Button = styled(JumboButton)`
  margin-top: 1.5rem;
`;
