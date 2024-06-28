import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import { invFollowingData, invMediabarData } from '@tw/ui/common';
import { Contacts, Trends, UserLIst } from '@tw/ui/components';
import {
  QueryAction,
  useFollowingInfQuery,
  useMostPopularUsersQuery,
  useResetQuery,
  useUserQuery,
  userGetFollowingKey,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const FOLLOWING_LIST_SIZE_LIMIT = 20;
const MEDIA_BAE_USER_LIST_TITLE = 'Who to follow';
const NO_DATA_TEXT = 'No more followers';

export const ProfileFollowingPage = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const invMediaBar = invMediabarData();
  const invMainLane = invFollowingData();

  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: mostPopularUsers, isFetching: mostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    data,
    fetchNextPage,
    isFetching: userListLoading,
    hasNextPage,
  } = useFollowingInfQuery(FOLLOWING_LIST_SIZE_LIMIT);

  const userList: FollowerListResponseDto[] = data?.pages?.flat() ?? [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    // THERE IS A PROBLEM WITH INF QUERY, IT WONT TRIGGER ON PAGE LANDING FOR SECOND TIME
    setTimeout(() => {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
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
          title={MEDIA_BAE_USER_LIST_TITLE}
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
