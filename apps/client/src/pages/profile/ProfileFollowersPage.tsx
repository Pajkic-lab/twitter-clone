import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import { invFollowersData, invMediabarData } from '@tw/ui/common';
import { Contacts, Trends, UserLIst } from '@tw/ui/components';
import {
  QueryAction,
  useFollowersInfQuery,
  useMostPopularUsersQuery,
  useResetQuery,
  useUserQuery,
  userGetFollowersKey,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const FOLLOWERS_LIST_SIZE_LIMIT = 20;
const MEDIA_BAR_USER_LIST_TITLE = 'Who to follow';
const NO_DATA_TEXT = 'No more followers';

export const ProfileFollowersPage = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const invMediaBar = invMediabarData();
  const invMainLane = invFollowersData();

  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: mostPopularUsers, isFetching: mostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    data,
    fetchNextPage,
    isFetching: userListLoading,
    hasNextPage,
  } = useFollowersInfQuery(FOLLOWERS_LIST_SIZE_LIMIT);

  const userList: FollowerListResponseDto[] = data?.pages?.flat() ?? [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    // THERE IS A PROBLEM WITH INF QUERY, IT WONT TRIGGER ON PAGE LANDING FOR SECOND TIME
    setTimeout(() => {
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
    }, 50);
  }, []);

  return (
    <Contacts
      user={user}
      userList={userList}
      userListLoading={userListLoading}
      infScrollElRef={ref}
      hasMoreData={hasNextPage}
      noDataText={NO_DATA_TEXT}
      invData={invMainLane}
      mediabarTopWindowChilde={
        <UserLIst
          meId={user.id}
          title={MEDIA_BAR_USER_LIST_TITLE}
          userList={mostPopularUsers}
          showBio={false}
          userListLoading={mostPopularUsersLoading}
          invData={invMediaBar}
        />
      }
      mediabarBottomWindowChilde={<Trends />}
    />
  );
};
