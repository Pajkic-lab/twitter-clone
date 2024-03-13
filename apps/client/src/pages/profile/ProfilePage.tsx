import { UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { ParsedError } from '@tw/ui/common';
import {
  EditProfileForm,
  Mediabar,
  Modal,
  ProfileMainLane,
  SecondaryButton,
  Sidebar,
  Trends,
  UpdateUserFormData,
  UserLIst,
} from '@tw/ui/components';
import {
  useMostPopularUsersQuery,
  useSocialQuery,
  useUpdateUserMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

const UPDATE_USER_FORM_ID = uuid();

export const ProfilePage = () => {
  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: socialStats } = useSocialQuery();
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    mutate: updateUserMutate,
    isPending: updateUserLoading,
    error,
  } = useUpdateUserMutation();

  const updateUserErrorMessage = error?.message as ParsedError;

  const [isEditProfileModalOpen, setEditModalProfileOpen] =
    useState<boolean>(false);

  const onSubmitUpdateUser = useCallback(
    (userFormData: UpdateUserFormData) => {
      updateUserMutate(userFormData);
    },
    [updateUserMutate]
  );

  const openEditProfileModal = () => {
    setEditModalProfileOpen(true);
  };

  return (
    <PageWrapper>
      <Sidebar />

      <ProfileMainLane
        user={user}
        socialStats={socialStats}
        profileActions={
          <EditProfileButton onClick={openEditProfileModal}>
            Edit profile
          </EditProfileButton>
        }
        profileModal={
          <Modal
            modalIsOpen={isEditProfileModalOpen}
            setModalIsOpen={setEditModalProfileOpen}
            actionsContentAlinement={'space-between'}
            hasCloseButton
            actionsPositionSticky
            heightFixed
            actions={[
              <Text key={uuid()}>Edit profile</Text>,
              <EditProfileButton
                key={uuid()}
                form={UPDATE_USER_FORM_ID}
                type="submit"
                $width={5}
                loading={updateUserLoading}
              >
                save
              </EditProfileButton>,
            ]}
            children={
              <EditProfileForm
                user={user}
                error={updateUserErrorMessage}
                formId={UPDATE_USER_FORM_ID}
                onSubmitUpdateUser={onSubmitUpdateUser}
              />
            }
          />
        }
      />

      <Mediabar
        meId={user.id}
        topWindowChilde={
          <UserLIst
            meId={user.id}
            title={'You might like'}
            users={mostPopularUsers}
            userListLoading={isMostPopularUsersLoading}
          />
        }
        bottomWindowChilde={<Trends />}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EditProfileButton = styled(SecondaryButton)`
  color: ${colors.grayPrimary};
  height: 2.286rem;
  padding: 0 16px;
`;

const Text = styled.span`
  color: ${colors.grayPrimary};
  font-weight: 700;
  font-size: large;
`;
