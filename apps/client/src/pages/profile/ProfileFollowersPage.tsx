import {
  Mediabar,
  Sidebar,
  Trends,
  UserListLane,
  WhoToFollow,
} from '@tw/ui/components';
import {
  useFollowersQuery,
  useMostPopularUsersQuery,
} from '@tw/ui/data-access';
import styled from 'styled-components';

const followerOffset = 0;
const followerLimit = 50;

export const ProfileFollowersPage = () => {
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const { data: userList, isFetching: userListLoading } = useFollowersQuery({
    followerOffset,
    followerLimit,
  });

  return (
    <PageWrapper>
      <Sidebar />

      <UserListLane userList={userList} userListLoading={userListLoading} />

      <Mediabar
        topWindowChilde={
          <WhoToFollow
            title={'You might like'}
            mostPopularUsers={mostPopularUsers}
            isMostPopularUsersLoading={isMostPopularUsersLoading}
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
