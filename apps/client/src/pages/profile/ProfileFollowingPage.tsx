import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import { Contacts } from '@tw/ui/components';
import {
  useFollowingInfQuery,
  useMostPopularUsersQuery,
  useUserQuery,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const FOLLOWING_LIST_SIZE_LIMIT = 20;

export const ProfileFollowingPage = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

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

  return (
    <Contacts
      user={user}
      userList={userList}
      userListLoading={userListLoading}
      infScrollElRef={ref}
      hasMoreData={hasNextPage}
      noDataText={'No more users you follow'}
      mediaBarUserListTitle={'Who to follow'}
      mostPopularUsers={mostPopularUsers}
      mostPopularUsersLoading={mostPopularUsersLoading}
    />
  );
};
