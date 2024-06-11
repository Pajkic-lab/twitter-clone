import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import { Contacts, Loader, Trends, UserLIst } from '@tw/ui/components';
import {
  QueryAction,
  mostPopularUsersQueryKey,
  publicProfileFollowersKey,
  publicProfileFollowingKey,
  useFollowMutation,
  useMostPopularUsersQuery,
  usePublicProfileFollowersInfQuery,
  usePublicProfileQuery,
  useResetQuery,
  useUnFollowMutation,
  useUserQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

const FOLLOWER_LIST_SIZE_LIMIT = 20;
const MEDIA_BAR_USER_LIST_TITLE = 'Who to follow';

export const PublicProfileFollowersPage = () => {
  const params = useParams();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const publicUserId = Number(params?.userId);

  const [idToConnectTo, setIdToConnectTo] = useState<number>(0);
  const [isConnectPending, setIsConnectPending] = useState<number[]>([]);

  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const publicUserRes = usePublicProfileQuery(publicUserId);
  const { data: mostPopularUsers, isFetching: mostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    data,
    fetchNextPage,
    isFetching: userListLoading,
    hasNextPage,
  } = usePublicProfileFollowersInfQuery(publicUserId, FOLLOWER_LIST_SIZE_LIMIT);

  const { mutateAsync: followMutation, isPending: isFollowLoading } =
    useFollowMutation();
  const { mutateAsync: unFollowMutation, isPending: isUnFollowingLoading } =
    useUnFollowMutation();

  const publicUser = publicUserRes?.data?.user;
  const userList: FollowerListResponseDto[] = data?.pages?.flat() ?? [];
  let noDataText = 'user does not follow anyone else';
  if (publicUser) {
    noDataText = `${publicUser.name} does not follow anyone else`;
  }

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
    followingStatus: boolean,
    pubUserId?: number
  ) => {
    if (!followingStatus) {
      setIdToConnectTo(connectUserId);

      const { status } = await followMutation({ userId: connectUserId });

      if (status) {
        if (pubUserId) {
          useResetQuery(
            QueryAction.Invalidate,
            publicProfileFollowersKey(pubUserId)
          );
          useResetQuery(
            QueryAction.Invalidate,
            publicProfileFollowingKey(pubUserId)
          );
        }
        useResetQuery(QueryAction.Refetch, userGetFollowingKey());
        useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

        if (
          userList.some((user) =>
            mostPopularUsers?.some((popUser) => user.id === popUser.id)
          )
        ) {
          useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
        }
      }
      return;
    }
    setIdToConnectTo(connectUserId);

    const { status } = await unFollowMutation({ userId: connectUserId });

    if (status) {
      if (pubUserId) {
        useResetQuery(
          QueryAction.Invalidate,
          publicProfileFollowersKey(pubUserId)
        );
        useResetQuery(
          QueryAction.Invalidate,
          publicProfileFollowingKey(pubUserId)
        );
      }
      useResetQuery(QueryAction.Refetch, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      if (
        userList.some((user) =>
          mostPopularUsers?.some((popUser) => user.id === popUser.id)
        )
      ) {
        useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      }
    }
  };

  if (!user || !publicUser) return <Loader fullScreen />;
  return (
    <Contacts
      user={user}
      pubLicUser={publicUser}
      userList={userList}
      userListLoading={userListLoading}
      infScrollElRef={ref}
      hasMoreData={hasNextPage}
      noDataText={noDataText}
      handleUserConnect={handleUserConnect}
      isConnectPending={isConnectPending}
      topWindowChilde={
        <UserLIst
          meId={user.id}
          publicUserId={publicUserId}
          title={MEDIA_BAR_USER_LIST_TITLE}
          userList={mostPopularUsers}
          userListLoading={mostPopularUsersLoading}
          handleUserConnect={handleUserConnect}
          isConnectPending={isConnectPending}
          showBio={false}
        />
      }
      bottomWindowChilde={<Trends />}
    />
  );
};
