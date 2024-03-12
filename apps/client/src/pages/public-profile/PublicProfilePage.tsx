import { PublicUserResponseDto, SocialStatsResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import {
  Loader,
  Mediabar,
  ProfileMainLane,
  SecondaryButton,
  Sidebar,
  Trends,
  UserLIst,
} from '@tw/ui/components';
import {
  useMostPopularUsersQuery,
  usePublicProfileQuery,
} from '@tw/ui/data-access';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const PublicProfilePage = () => {
  const params = useParams();

  const userId = Number(params?.userId);

  const publicUserRes = usePublicProfileQuery(userId);

  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const user = publicUserRes?.data?.user as PublicUserResponseDto;
  const socialStats = publicUserRes?.data
    ?.socialStats as SocialStatsResponseDto;

  const followingStatus = publicUserRes?.data?.followingStatus as boolean;
  console.log(followingStatus);

  if (publicUserRes.isFetching) return <Loader fullScreen />;
  return (
    <PageWrapper>
      <Sidebar />

      <ProfileMainLane
        user={user}
        socialStats={socialStats}
        profileActions={<FollowButton>Follow</FollowButton>}
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

// const EditProfileButton = styled(SecondaryButton)`
//   color: ${colors.grayPrimary};
//   height: 2.286rem;
//   padding: 0 16px;
// `;

const Text = styled.span`
  color: ${colors.grayPrimary};
  font-weight: 700;
  font-size: large;
`;

//

const FollowButton = styled(SecondaryButton)`
  color: ${colors.black};
  background-color: ${colors.white};
  height: 2.286rem;
  padding: 0 16px;

  &:hover {
    color: ${colors.white};
  }
`;
const UnFollowButton = styled(SecondaryButton)`
  color: ${colors.grayPrimary};
  height: 2.286rem;
  padding: 0 16px;

  &:hover {
    color: ${colors.red};
    border: 1px solid ${colors.red};
  }
`;
