import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@tw/ui/assets';
import { FormInput, InputComponent, SecondaryButton } from '@tw/ui/components';
import { updateUser, useAppDispatch } from '@tw/ui/data-access';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { ReactComponent as Cross } from '../../assets/svg/cross.svg';

// have to add validation on backend, at front can not add validation to be optional and to have min max...
const updateUserSchema = z.object({
  name: z.optional(z.string()),
  bio: z.optional(z.string()),
  location: z.optional(z.string()),
  website: z.optional(z.string()),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

interface Props {
  editProfileModalIsOpen: boolean;
  setEditProfileModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditProfileModal: React.FC<Props> = ({
  editProfileModalIsOpen,
  setEditProfileModalIsOpen,
}) => {
  const dispatch = useAppDispatch();

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

  const { errors } = formState;

  useEffect(() => {
    // Error handling is missing, should be added subsequently because validation does not work, it must be done at backend...
    // console.log(111, errors);
  }, [errors]);

  const closeModal = () => {
    setEditProfileModalIsOpen(false);
  };

  const onSubmit = async (updatedValues: any) => {
    console.log(1111, updatedValues);
    //  should probably add avatar and cover to request
    await dispatch(updateUser(updatedValues));
    //   setEditProfileModalIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={editProfileModalIsOpen} onBackgroundClick={closeModal}>
        <ModalSection>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TittleWrapper>
              <SVGTittleWrapper>
                <ExitSvgWrapper onClick={closeModal}>
                  <CrossSvg />
                </ExitSvgWrapper>
                <H2Tittle>Eddit profile</H2Tittle>
              </SVGTittleWrapper>
              <SaveModalButton type="submit">Save</SaveModalButton>
            </TittleWrapper>

            <CoverWeapper $backgroundImage={cover}>
              {/* <ImageInput
                id={'cover'}
                type={'file'}
                name={'Cover'}
                setImageData={setCoverData}
              /> */}
            </CoverWeapper>

            <AvatarWrapper $backgroundImage={avatar}>
              {/* <ImageInput
                id={'avatar'}
                type={'file'}
                name={'Avatar'}
                setImageData={setAvatarData}
              /> */}
            </AvatarWrapper>

            <FormInput control={control} name="name" id={uuid()} type="text" />
            <FormInput control={control} name="bio" id={uuid()} type="text" />
            <FormInput
              control={control}
              name="location"
              id={uuid()}
              type="text"
            />
            <FormInput
              control={control}
              name="website"
              id={uuid()}
              type="text"
            />
          </Form>
        </ModalSection>
      </Modal>
    </>
  );
};

const ModalSection = styled.div`
  height: 75vh;
  overflow-y: scroll;
  border-radius: 1rem;
  padding: 0 1.5rem 1rem 1.5rem;
  background-color: ${colors.black};
`;

////////////////////////////////////////////////////////
const TittleWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  /* background-color: red; // */
`;

const SVGTittleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExitSvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
`;

const CrossSvg = styled(Cross)`
  fill: ${colors.white};
  width: 1.5rem;
  height: 1.5rem;
`;

const H2Tittle = styled.h2`
  margin: 0;
  font-weight: 700;
  color: ${colors.white};
`;

const SaveModalButton = styled(SecondaryButton)`
  color: ${colors.grayPrimary};
  padding-left: 0;
  padding-right: 0;
`;

const CoverWeapper = styled.div<{ $backgroundImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 1rem;
  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    crossOrigin: 'anonymous'
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const AvatarWrapper = styled.div<{ $backgroundImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: ${colors.grayModalBackgroundShadow};
  margin-bottom: 1rem;
  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    crossOrigin: 'anonymous'
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const Form = styled.form``;

const Input = styled(InputComponent)`
  width: 35rem;
`;
