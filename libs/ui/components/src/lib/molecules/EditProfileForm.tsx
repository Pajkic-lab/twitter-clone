import { zodResolver } from '@hookform/resolvers/zod';
import { Colors } from '@tw/ui/assets';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { ImageInput } from '../atoms/ImageInput';
import { FormInput } from './FormInput';

// have to add validation on backend, at front can not add validation to be optional and to have min max...
const updateUserSchema = z.object({
  name: z.optional(z.string()),
  bio: z.optional(z.string()),
  location: z.optional(z.string()),
  website: z.optional(z.string()),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

type EditProfileFormProps = {
  // setEditProfileModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditProfileForm = (props: EditProfileFormProps) => {
  // const { setEditProfileModalIsOpen } = props;

  const [cover, setCoverData] = useState<string>('');
  const [avatar, setAvatarData] = useState<string>('');

  const { handleSubmit, control, formState, setError } =
    useForm<UpdateUserFormData>({
      resolver: zodResolver(updateUserSchema),
      criteriaMode: 'all',
      mode: 'onBlur',
      defaultValues: {
        name: '',
        bio: '',
        location: '',
        website: '',
      },
    });

  return (
    <Wrapper>
      <form onSubmit={() => undefined}>
        <CoverWrapper $backgroundImage={cover}>
          <ImageInput
            id={'cover'}
            type={'file'}
            name={'Cover'}
            setImageData={setCoverData}
          />
        </CoverWrapper>

        <AvatarWrapper $backgroundImage={avatar}>
          <ImageInput
            id={'avatar'}
            type={'file'}
            name={'Avatar'}
            setImageData={setAvatarData}
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

const CoverWrapper = styled.div<{ $backgroundImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 1rem;
  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `
    background-image: url(${$backgroundImage});

  `}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const AvatarWrapper = styled.div<{ $backgroundImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: ${Colors.grayModalBackgroundShadow};
  margin-bottom: 1rem;
  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `
    background-image: url(${$backgroundImage});

  `}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
