import {
  FollowerListResponseDto,
  PublicUserResponseDto,
  UserResponseDto,
} from '@tw/data';
import { Contacts, Trends, UserLIst } from '@tw/ui/components';
import {
  QueryAction,
  publicProfileFollowersKey,
  publicProfileFollowingKey,
  useFollowMutation,
  useMostPopularUsersQuery,
  usePublicProfileFollowingInfQuery,
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

const FOLLOWING_LIST_SIZE_LIMIT = 20;
const MEDIA_BAR_USER_LIST_TITLE = 'Who to follow';

export const PublicProfileFollowingPage = () => {
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
  } = usePublicProfileFollowingInfQuery(
    publicUserId,
    FOLLOWING_LIST_SIZE_LIMIT
  );

  const { mutateAsync: followMutation, isPending: isFollowLoading } =
    useFollowMutation();
  const { mutateAsync: unFollowMutation, isPending: isUnFollowingLoading } =
    useUnFollowMutation();

  const publicUser = publicUserRes?.data?.user as PublicUserResponseDto;
  const userList: FollowerListResponseDto[] = data?.pages?.flat() ?? [];
  const noDataText = `${publicUser.name} does not follow anyone else`;

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
    }
  };

  return (
    <Contacts
      user={user}
      pubLicUser={publicUser}
      userList={userList}
      userListLoading={userListLoading}
      showBio
      infScrollElRef={ref}
      hasMoreData={hasNextPage}
      noDataText={noDataText}
      handleUserConnect={handleUserConnect}
      isConnectPending={isConnectPending}
      topWindowChilde={
        <UserLIst
          meId={user.id}
          title={MEDIA_BAR_USER_LIST_TITLE}
          userList={mostPopularUsers}
          userListLoading={mostPopularUsersLoading}
          showBio={false}
          handleUserConnect={handleUserConnect}
          isConnectPending={isConnectPending}
        />
      }
      bottomWindowChilde={<Trends />}
    />
  );
};
