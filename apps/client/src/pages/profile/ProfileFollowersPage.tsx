import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import { Contacts, Trends, UserLIst } from '@tw/ui/components';
import {
  QueryAction,
  useFollowMutation,
  useFollowersInfQuery,
  useMostPopularUsersQuery,
  useResetQuery,
  useUnFollowMutation,
  useUserQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const FOLLOWERS_LIST_SIZE_LIMIT = 20;
const MEDIA_BAR_USER_LIST_TITLE = 'Who to follow';
const NO_DATA_TEXT = 'No more followers';

export const ProfileFollowersPage = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [idToConnectTo, setIdToConnectTo] = useState<number>(0);
  const [isConnectPending, setIsConnectPending] = useState<number[]>([]);

  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: mostPopularUsers, isFetching: mostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    data,
    fetchNextPage,
    isFetching: userListLoading,
    hasNextPage,
  } = useFollowersInfQuery(FOLLOWERS_LIST_SIZE_LIMIT);

  const { mutateAsync: followMutation, isPending: isFollowLoading } =
    useFollowMutation();
  const { mutateAsync: unFollowMutation, isPending: isUnFollowingLoading } =
    useUnFollowMutation();

  const userList: FollowerListResponseDto[] = data?.pages?.flat() ?? [];

  const connectionPending =
    isFollowLoading || isUnFollowingLoading || userListLoading;

  useEffect(() => {
    if (connectionPending) {
      setIsConnectPending([...isConnectPending, idToConnectTo]);
    } else {
      setIsConnectPending([]);
    }
  }, [connectionPending, idToConnectTo]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleUserConnect = async (
    connectUserId: number,
    followingStatus: boolean
  ) => {
    if (!followingStatus) {
      setIdToConnectTo(connectUserId);

      const { status } = await followMutation({ userId: connectUserId });

      if (status) {
        useResetQuery(QueryAction.Remove, userGetFollowingKey());
        useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      }
      return;
    }
    setIdToConnectTo(connectUserId);

    const { status } = await unFollowMutation({ userId: connectUserId });

    if (status) {
      useResetQuery(QueryAction.Remove, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
    }
  };

  return (
    <Contacts
      user={user}
      userList={userList}
      userListLoading={userListLoading}
      infScrollElRef={ref}
      hasMoreData={hasNextPage}
      noDataText={NO_DATA_TEXT}
      handleUserConnect={handleUserConnect}
      isConnectPending={isConnectPending}
      topWindowChilde={
        <UserLIst
          meId={user.id}
          title={MEDIA_BAR_USER_LIST_TITLE}
          userList={mostPopularUsers}
          userListLoading={mostPopularUsersLoading}
          handleUserConnect={handleUserConnect}
          isConnectPending={isConnectPending}
        />
      }
      bottomWindowChilde={<Trends />}
    />
  );
};
