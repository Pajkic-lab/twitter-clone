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
  QueryAction,
  mostPopularUsersQueryKey,
  socialStatsQueryKey,
  useFollowMutation,
  useMostPopularUsersQuery,
  useResetQuery,
  useSocialStatsQuery,
  useUnFollowMutation,
  useUpdateUserMutation,
  useUserQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

const UPDATE_USER_FORM_ID = uuid();

export const ProfilePage = () => {
  const [idToConnectTo, setIdToConnectTo] = useState<number>(0);
  const [isConnectPending, setIsConnectPending] = useState<number[]>([]);

  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: socialStats } = useSocialStatsQuery();
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    mutate: updateUserMutate,
    isPending: updateUserLoading,
    error,
  } = useUpdateUserMutation();

  const { mutateAsync: followMutation, isPending: isFollowLoading } =
    useFollowMutation();
  const { mutateAsync: unFollowMutation, isPending: isUnFollowingLoading } =
    useUnFollowMutation();

  const { name, uniqueName, avatar } = user ?? ({} as UserResponseDto);
  const updateUserErrorMessage = error?.message as ParsedError;

  const connectionPending = isFollowLoading || isUnFollowingLoading;

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

  const handleUserConnect = async (
    connectUserId: number,
    followingStatus: boolean
  ) => {
    if (!followingStatus) {
      setIdToConnectTo(connectUserId);

      const { status } = await followMutation({ userId: connectUserId });

      if (status) {
        useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
        useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

        useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
        useResetQuery(QueryAction.Invalidate, socialStatsQueryKey());
      }
      return;
    }
    setIdToConnectTo(connectUserId);

    const { status } = await unFollowMutation({ userId: connectUserId });

    if (status) {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      useResetQuery(QueryAction.Invalidate, socialStatsQueryKey());
    }
  };

  useEffect(() => {
    if (connectionPending) {
      setIsConnectPending([...isConnectPending, idToConnectTo]);
    } else {
      setIsConnectPending([]);
    }
  }, [connectionPending, idToConnectTo]);

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
            handleUserConnect={handleUserConnect}
            isConnectPending={isConnectPending}
            showBio={false}
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
