import { UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { ParsedError, invProfilePage } from '@tw/ui/common';
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
  useSocialStatsQuery,
  useUpdateUserMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

const UPDATE_USER_FORM_ID = uuid();

export const ProfilePage = () => {
  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: socialStats } = useSocialStatsQuery();
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    mutate: updateUserMutate,
    isPending: updateUserLoading,
    error,
  } = useUpdateUserMutation();

  const { name, uniqueName, avatar } = user ?? ({} as UserResponseDto);
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

  const invData = invProfilePage();

  return (
    <PageWrapper>
      <Sidebar name={name} uniqueName={uniqueName} avatar={avatar} />

      <ProfileMainLane
        user={user}
        socialStats={socialStats}
        profileActions={
          <EditProfileButton onClick={openEditProfileModal}>
            Edit profile
          </EditProfileButton>
        }
        // why is this injected as child component? will there be need to have different model? think about when to have child injected
        // and when to just use it inside component? Maybe there is need i don't know, just looks sketchy...
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
                $width={5}
                type="submit"
                form={UPDATE_USER_FORM_ID}
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
            userList={mostPopularUsers}
            userListLoading={isMostPopularUsersLoading}
            showBio={false}
            invData={invData}
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
