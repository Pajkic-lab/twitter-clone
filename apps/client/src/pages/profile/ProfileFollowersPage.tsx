import { UserResponseDto } from '@tw/data';
import {
  Mediabar,
  Sidebar,
  Trends,
  UserLIst,
  UserListLane,
} from '@tw/ui/components';
import {
  useFollowersQuery,
  useMostPopularUsersQuery,
  useUserQuery,
} from '@tw/ui/data-access';
import styled from 'styled-components';

const followerOffset = 0;
const followerLimit = 50;

export const ProfileFollowersPage = () => {
  const { data: user } = useUserQuery() as { data: UserResponseDto };
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const { data: userList, isFetching: userListLoading } = useFollowersQuery({
    followerOffset,
    followerLimit,
  });

  return (
    <PageWrapper>
      <Sidebar />

      <UserListLane
        user={user}
        userList={userList}
        userListLoading={userListLoading}
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
