import {
  PublicUserResponseDto,
  SocialStatsResponseDto,
  UserResponseDto,
} from '@tw/data';
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
  useFollowMutation,
  useMostPopularUsersQuery,
  usePublicProfileQuery,
  useUnFollowMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const PublicProfilePage = () => {
  const params = useParams();

  const userId = Number(params?.userId);

  const userRes = useUserQuery();
  const publicUserRes = usePublicProfileQuery(userId);

  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const { mutate: followMutation } = useFollowMutation();
  const { mutate: unFollowMutation } = useUnFollowMutation();

  const publicUser = publicUserRes?.data?.user as PublicUserResponseDto;
  const socialStats = publicUserRes?.data
    ?.socialStats as SocialStatsResponseDto;

  const {
    id: meId,
    name,
    uniqueName,
    avatar,
  } = userRes.data ?? ({} as UserResponseDto);

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

  const handleClick = () => {
    if (!followingStatus) {
      followMutation({ userId });
    }
    if (followingStatus) {
      unFollowMutation({ userId });
    }
  };

  if (publicUserRes.isFetching) return <Loader fullScreen />;
  return (
    <PageWrapper>
      <Sidebar name={name} uniqueName={uniqueName} avatar={avatar} />

      <ProfileMainLane
        user={publicUser}
        socialStats={socialStats}
        profileActions={
          <ConnectButton
            $followingStatus={followingStatus}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
            onClick={handleClick}
          >
            {socialButtonText}
          </ConnectButton>
        }
      />

      <Mediabar
        meId={meId}
        topWindowChilde={
          <UserLIst
            meId={meId}
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

const ConnectButton = styled(SecondaryButton)<{ $followingStatus: boolean }>`
  height: 2.286rem;
  padding: 0 16px;
  width: 7rem;

  color: ${({ $followingStatus }) =>
    $followingStatus ? colors.black : colors.grayPrimary};

  background-color: ${({ $followingStatus }) =>
    $followingStatus ? colors.white : ''};

  &:hover {
    color: ${({ $followingStatus }) =>
      $followingStatus ? colors.red : colors.white};
    border: ${({ $followingStatus }) =>
      $followingStatus ? `1px solid ${colors.red}` : ''};
  }
`;
