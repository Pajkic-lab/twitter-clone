import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import {
  Mediabar,
  Sidebar,
  Trends,
  UserLIst,
  UserListLane,
} from '@tw/ui/components';
import {
  useFollowingInfQuery,
  useMostPopularUsersQuery,
  useUserQuery,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const FOLLOWING_LIST_SIZE_LIMIT = 20;

export const ProfileFollowingPage = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
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
    <PageWrapper>
      <Sidebar />

      <UserListLane
        meId={user.id}
        user={user}
        userList={userList}
        userListLoading={userListLoading}
        infScrollElRef={ref}
        hasMoreData={hasNextPage}
        noDataText={'End of following list'}
      />

      <Mediabar
        meId={user.id}
        topWindowChilde={
          <UserLIst
            meId={user.id}
            title={'You might like'}
            users={mostPopularUsers}
            userListLoading={isMostPopularUsersLoading}
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
