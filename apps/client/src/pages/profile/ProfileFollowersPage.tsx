import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import {
  Mediabar,
  Sidebar,
  Trends,
  UserLIst,
  UserListLane,
} from '@tw/ui/components';
import {
  useFollowersInfQuery,
  useMostPopularUsersQuery,
  useUserQuery,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

// const followerOffset = 0;
// const followerLimit = 50;

export const ProfileFollowersPage = () => {
  //
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  //

  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  // const { data: userList, isFetching: userListLoading } = useFollowersQuery({
  //   followerOffset,
  //   followerLimit,
  // });

  const {
    data,
    fetchNextPage,
    isFetching: userListLoading,
    hasNextPage,
  } = useFollowersInfQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      console.log('fire');
    }
  }, [inView]);

  const pageParams = data?.pageParams;
  const pages = data?.pages;

  const userList: FollowerListResponseDto[] = pages?.flat() ?? [];

  return (
    <PageWrapper>
      <Sidebar />

      <UserListLane
        user={user}
        userList={userList} //
        userListLoading={userListLoading}
        reff={ref} // RENAME REFF IN DEPTH
      />

      <Mediabar
        topWindowChilde={
          <UserLIst
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
