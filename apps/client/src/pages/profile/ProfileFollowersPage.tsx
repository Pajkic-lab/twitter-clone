import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import { Contacts } from '@tw/ui/components';
import {
  useFollowersInfQuery,
  useMostPopularUsersQuery,
  useUserQuery,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const FOLLOWER_LIST_SIZE_LIMIT = 20;

export const ProfileFollowersPage = () => {
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
  } = useFollowersInfQuery(FOLLOWER_LIST_SIZE_LIMIT);

  const userList: FollowerListResponseDto[] = data?.pages?.flat() ?? [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Contacts
      meId={user.id}
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
