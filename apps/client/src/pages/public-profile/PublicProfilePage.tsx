import { PublicUserResponseDto, UserResponseDto } from '@tw/data';
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
  QueryAction,
  publicProfileFollowersKey,
  publicUserFollowingStatsQueryKey,
  publicUserSocialStatsQueryKey,
  useFollowMutation,
  useMostPopularUsersQuery,
  usePublicProfileQuery,
  usePublicUserFollowingStatusQuery,
  usePublicUserSocialStatsQuery,
  useResetQuery,
  useUnFollowMutation,
  useUserQuery,
  userGetFollowingKey,
} from '@tw/ui/data-access';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const PublicProfilePage = () => {
  const params = useParams();

  const userId = Number(params?.userId);

  const userRes = useUserQuery();
  const publicUserRes = usePublicProfileQuery(userId);
  const { data: socialStats } = usePublicUserSocialStatsQuery(userId);
  const { data: followingStatusData, isFetching: isFollowStatusLoading } =
    usePublicUserFollowingStatusQuery(userId);

  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const { mutateAsync: followMutation, isPending: isFollowLoading } =
    useFollowMutation();
  const { mutateAsync: unFollowMutation, isPending: isUnFollowLoading } =
    useUnFollowMutation();

  const publicUser = publicUserRes?.data?.user as PublicUserResponseDto;
  const publicUserId = publicUserRes?.data?.user?.id as number;
  const followingStatus = followingStatusData?.followingStatus as boolean;

  // console.log(1, publicUserId);

  const {
    id: meId,
    name,
    uniqueName,
    avatar,
  } = userRes.data ?? ({} as UserResponseDto);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const btFollowText = isHovered ? 'UnFollow' : 'Following';
  const connectButtonText = followingStatus ? btFollowText : 'Follow';
  const isConnectButtonLoading =
    isFollowLoading || isUnFollowLoading || isFollowStatusLoading;

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverExit = () => {
    setIsHovered(false);
  };

  const handleConnect = async () => {
    if (!followingStatus) {
      const { status } = await followMutation({ userId: publicUserId });
      if (status) {
        useResetQuery(
          QueryAction.Invalidate,
          publicUserSocialStatsQueryKey(publicUserId)
        );
        useResetQuery(
          QueryAction.Invalidate,
          publicUserFollowingStatsQueryKey(publicUserId)
        );
        //
        useResetQuery(
          QueryAction.Invalidate,
          publicProfileFollowersKey(publicUserId)
        );
        //
        useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      }
      return;
    }
    const { status } = await unFollowMutation({ userId: publicUserId });
    if (status) {
      useResetQuery(
        QueryAction.Invalidate,
        publicUserSocialStatsQueryKey(publicUserId)
      );
      useResetQuery(
        QueryAction.Invalidate,
        publicUserFollowingStatsQueryKey(publicUserId)
      );
      //
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowersKey(publicUserId)
      );
      //
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
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
            loading={isConnectButtonLoading}
            $followingStatus={followingStatus}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
            onClick={handleConnect}
          >
            {connectButtonText}
          </ConnectButton>
        }
      />

      <Mediabar
        meId={meId}
        topWindowChilde={
          <UserLIst
            meId={meId}
            title={'You might like'}
            userList={mostPopularUsers}
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
