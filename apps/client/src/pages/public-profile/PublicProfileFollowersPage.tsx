import { FollowerListResponseDto, PublicUserResponseDto } from '@tw/data';
import {
  Mediabar,
  Sidebar,
  Trends,
  UserLIst,
  UserListLane,
} from '@tw/ui/components';
import {
  useMostPopularUsersQuery,
  usePublicProfileFollowersInfQuery,
  usePublicProfileQuery,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const FOLLOWER_LIST_SIZE_LIMIT = 20;

export const PublicProfileFollowersPage = () => {
  const params = useParams();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const userId = Number(params?.userId);

  const publicUserRes = usePublicProfileQuery(userId);
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    data,
    fetchNextPage,
    isFetching: userListLoading,
    hasNextPage,
  } = usePublicProfileFollowersInfQuery(userId, FOLLOWER_LIST_SIZE_LIMIT);

  const user = publicUserRes?.data?.user as PublicUserResponseDto;
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
        user={user}
        userList={userList}
        userListLoading={userListLoading}
        infScrollElRef={ref}
        hasMoreData={hasNextPage}
        noDataText={'End of followers list'}
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
