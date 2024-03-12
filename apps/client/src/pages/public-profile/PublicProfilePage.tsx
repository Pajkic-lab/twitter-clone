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
import { useState } from 'react';
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

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const btFollowText = isHovered ? 'UnFollow' : 'Following';
  const socialButtonText = followingStatus ? btFollowText : 'Follow';

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverExit = () => {
    setIsHovered(false);
  };

  if (publicUserRes.isFetching) return <Loader fullScreen />;
  return (
    <PageWrapper>
      <Sidebar />

      <ProfileMainLane
        user={user}
        socialStats={socialStats}
        profileActions={
          <SocialButton
            followingStatus={followingStatus}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
          >
            {socialButtonText}
          </SocialButton>
        }
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

const SocialButton = styled(SecondaryButton)<{ followingStatus: boolean }>`
  height: 2.286rem;
  padding: 0 16px;
  width: 7rem;

  color: ${({ followingStatus }) =>
    followingStatus ? colors.black : colors.grayPrimary};

  background-color: ${({ followingStatus }) =>
    followingStatus ? colors.white : ''};

  &:hover {
    color: ${({ followingStatus }) =>
      followingStatus ? colors.red : colors.white};
    border: ${({ followingStatus }) =>
      followingStatus ? `1px solid ${colors.red}` : ''};
  }
`;
