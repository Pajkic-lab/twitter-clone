import { zodResolver } from '@hookform/resolvers/zod';
import { UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { FormImageInput } from './FormImageInput';
import { FormInput } from './FormInput';

// have to add validation on backend, at front can not add validation to be optional and to have min max...
const updateUserSchema = z.object({
  name: z.optional(z.string().nullish()),
  bio: z.optional(z.string().nullish()),
  location: z.optional(z.string().nullish()),
  website: z.optional(z.string().nullish()),
  cover: z.optional(z.string().nullish()),
  avatar: z.optional(z.string().nullish()),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

type EditProfileFormProps = {
  formId: string;
  onSubmitUpdateUser: (userFromData: UpdateUserFormData) => void;
  user: UserResponseDto;
};

export const EditProfileForm = (props: EditProfileFormProps) => {
  const { formId, onSubmitUpdateUser, user } = props;

  const { handleSubmit, control, formState, setError, watch, setValue } =
    useForm<UpdateUserFormData>({
      resolver: zodResolver(updateUserSchema),
      criteriaMode: 'all',
      mode: 'onBlur',
      defaultValues: {
        cover: '',
        avatar: '',
        name: '',
        bio: '',
        location: '',
        website: '',
      },
    });

  const { avatar, cover } = watch();

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        setValue(key as keyof UpdateUserFormData, value);
      });
    }
  }, [user, setValue]);

  return (
    <Wrapper>
      <form id={formId} onSubmit={handleSubmit(onSubmitUpdateUser)}>
        <CoverWrapper $backgroundImage={cover}>
          <FormImageInput
            control={control}
            id={uuid()}
            type={'file'}
            name={'cover'}
          />
        </CoverWrapper>
        <AvatarWrapper $backgroundImage={avatar}>
          <FormImageInput
            control={control}
            id={uuid()}
            type={'file'}
            name={'avatar'}
          />
        </AvatarWrapper>
        <FormInput control={control} name="name" id={uuid()} type="text" />
        <FormInput control={control} name="bio" id={uuid()} type="text" />
        <FormInput control={control} name="location" id={uuid()} type="text" />
        <FormInput control={control} name="website" id={uuid()} type="text" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CoverWrapper = styled.div<{ $backgroundImage?: string | null }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 1rem;
  background-color: ${colors.grayDark};
  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `
    background-image: url(${$backgroundImage});

  `}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const AvatarWrapper = styled.div<{ $backgroundImage?: string | null }>`
  position: relative;
  top: -4rem;
  left: 0.5rem;
  border: 2px solid ${colors.black};
  background-color: ${colors.grayDark};
  z-index: 1;
  margin-bottom: -2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-right: 1rem;

  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `
    background-image: url(${$backgroundImage});

  `}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
