import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserRequestDto } from '@tw/data';
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
  cover: z.optional(z.string()),
  avatar: z.optional(z.string()),
  name: z.optional(z.string()),
  bio: z.optional(z.string()),
  location: z.optional(z.string()),
  website: z.optional(z.string()),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

type EditProfileFormProps = {
  setUserFormData: React.Dispatch<React.SetStateAction<UpdateUserRequestDto>>;
};

export const EditProfileForm = (props: EditProfileFormProps) => {
  const { setUserFormData } = props;

  const { handleSubmit, control, formState, setError, watch } =
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

  const { isValid } = formState;

  const updateUserFormData = watch();
  const { avatar, bio, cover, location, name, website } = updateUserFormData;

  useEffect(() => {
    setUserFormData({ avatar, bio, cover, location, name, website });
  }, [avatar, bio, cover, location, name, website]);

  return (
    <Wrapper>
      <form>
        <CoverWrapper $backgroundImage={updateUserFormData.cover}>
          <FormImageInput
            control={control}
            id={uuid()}
            type={'file'}
            name={'cover'}
          />
        </CoverWrapper>

        <AvatarWrapper $backgroundImage={updateUserFormData.avatar}>
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

const CoverWrapper = styled.div<{ $backgroundImage?: string }>`
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

const AvatarWrapper = styled.div<{ $backgroundImage?: string }>`
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
