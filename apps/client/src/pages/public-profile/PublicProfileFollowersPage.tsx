import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import {
  invPublicProfileFollowersData,
  invPublicProfileMediabarData,
} from '@tw/ui/common';
import { Contacts, Loader, Trends, UserLIst } from '@tw/ui/components';
import {
  QueryAction,
  publicProfileFollowersKey,
  useMostPopularUsersQuery,
  usePublicProfileFollowersInfQuery,
  usePublicProfileQuery,
  useResetQuery,
  useUserQuery,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

const FOLLOWER_LIST_SIZE_LIMIT = 20;
const MEDIA_BAR_USER_LIST_TITLE = 'Who to follow';

export const PublicProfileFollowersPage = () => {
  const params = useParams();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const invData = invPublicProfileFollowersData();
  const invMediaBar = invPublicProfileMediabarData();

  const publicUserId = Number(params?.userId);

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

  const publicUser = publicUserRes?.data?.user;
  const userList: FollowerListResponseDto[] = data?.pages?.flat() ?? [];
  let noDataText = 'user does not follow anyone else';
  if (publicUser) {
    noDataText = `${publicUser.name} does not follow anyone else`;
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    // THERE IS A PROBLEM WITH INF QUERY, IT WONT TRIGGER ON PAGE LANDING FOR SECOND TIME
    setTimeout(() => {
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowersKey(publicUserId)
      );
    }, 50);
  }, []);

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
      invData={invData}
      mediabarTopWindowChilde={
        <UserLIst
          meId={user.id}
          publicUserId={publicUserId}
          title={MEDIA_BAR_USER_LIST_TITLE}
          userList={mostPopularUsers}
          userListLoading={mostPopularUsersLoading}
          showBio={false}
          invData={invMediaBar}
        />
      }
      mediabarBottomWindowChilde={<Trends />}
    />
  );
};
