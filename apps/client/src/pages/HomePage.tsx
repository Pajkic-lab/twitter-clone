import { UserResponseDto } from '@tw/data';
import { colors, TwitterIcon } from '@tw/ui/assets';
import {
  HomeMainLane,
  Mediabar,
  Modal,
  SetAccountForm,
  Sidebar,
  Trends,
  UniqueNameFormData,
  UserLIst,
} from '@tw/ui/components';
import {
  mostPopularUsersQueryKey,
  QueryAction,
  useCheckUniqueUserNameMutation,
  useFollowMutation,
  useMostPopularUsersQuery,
  useResetQuery,
  userGetFollowersKey,
  userGetFollowingKey,
  useUnFollowMutation,
  useUpdateUniqueUserNameMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

const MEDIA_BAR_TOP_WINDOW_CONTAINER_TITLE = 'You might like';

export const HomePage = () => {
  const [idToConnectTo, setIdToConnectTo] = useState<number>(0);
  const [isConnectPending, setIsConnectPending] = useState<number[]>([]);

  const { data: user, isPending: userIsLoading } = useUserQuery();
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    data: uniqueUserName,
    mutate: checkUniqueUserNameMutate,
    isPending: checkUniqueNameLoading,
  } = useCheckUniqueUserNameMutation();

  const {
    mutate: updateUniqueUserNameMutate,
    isPending: updateUniqueUserNameLoading,
  } = useUpdateUniqueUserNameMutation();

  const { mutateAsync: followMutation, isPending: isFollowLoading } =
    useFollowMutation();
  const { mutateAsync: unFollowMutation, isPending: isUnFollowingLoading } =
    useUnFollowMutation();

  const { id, name, uniqueName, avatar } = user ?? ({} as UserResponseDto);
  const { isNameUnique } = uniqueUserName ?? {};

  const connectionPending = isFollowLoading || isUnFollowingLoading;

  const onSubmitUniqueName = useCallback(
    (uniqueNameFormData: UniqueNameFormData) => {
      updateUniqueUserNameMutate(uniqueNameFormData);
    },
    [updateUniqueUserNameMutate]
  );

  const onChangeUniqueName = useCallback(
    (uniqueName: string) => {
      checkUniqueUserNameMutate({ uniqueName });
    },
    [checkUniqueUserNameMutate]
  );

  const userHasNoUniqueName = useMemo(
    () => !uniqueName && !userIsLoading,
    [uniqueName, userIsLoading]
  );

  const isNameUniqueServerResponse = useMemo(
    () => !!isNameUnique,
    [isNameUnique]
  );

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
      }
      return;
    }
    setIdToConnectTo(connectUserId);

    const { status } = await unFollowMutation({ userId: connectUserId });

    if (status) {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
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

      <HomeMainLane />

      <Mediabar
        meId={id}
        topWindowChilde={
          <UserLIst
            meId={id}
            title={MEDIA_BAR_TOP_WINDOW_CONTAINER_TITLE}
            userList={mostPopularUsers}
            userListLoading={isMostPopularUsersLoading}
            handleUserConnect={handleUserConnect}
            isConnectPending={isConnectPending}
            showBio={false}
          />
        }
        bottomWindowChilde={<Trends />}
      />

      <Modal
        setModalIsOpen={() => undefined}
        modalIsOpen={userHasNoUniqueName}
        actionsContentAlinement={'center'}
        actions={[<TwLogo key={uuid()} />]}
      >
        <SetAccountForm
          onSubmit={onSubmitUniqueName}
          onChange={onChangeUniqueName}
          isNameUnique={isNameUniqueServerResponse}
          isFormSubmitting={updateUniqueUserNameLoading}
          isUniqueNameChecking={checkUniqueNameLoading}
        />
      </Modal>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TwLogo = styled(TwitterIcon)`
  fill: ${colors.grayLight};
  width: 2.5rem;
  height: 2.5rem;
`;
