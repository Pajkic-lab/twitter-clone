import { PublicUserResponseDto, UserResponseDto } from '@tw/data';
import { invMediabarData, invPublicProfilePage } from '@tw/ui/common';
import {
  ConnectButton,
  Loader,
  MainLane,
  Mediabar,
  Sidebar,
  Trends,
  UserLIst,
} from '@tw/ui/components';
import {
  useMostPopularUsersQuery,
  usePublicProfileQuery,
  usePublicUserFollowingStatusQuery,
  usePublicUserSocialStatsQuery,
  useUserQuery,
} from '@tw/ui/data-access';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const PublicProfilePage = () => {
  const params = useParams();

  const userId = String(params?.userId);

  const userRes = useUserQuery();
  const publicUserRes = usePublicProfileQuery(userId);
  const { data: socialStats } = usePublicUserSocialStatsQuery(userId);
  const { data: followingStatusData, isFetching: isFollowStatusLoading } =
    usePublicUserFollowingStatusQuery(userId);

  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const publicUser = publicUserRes?.data?.user as PublicUserResponseDto;
  const publicUserId = publicUserRes?.data?.user?.id as string;
  const followingStatus = followingStatusData?.followingStatus as boolean;

  const { id: meId, name, uniqueName, avatar } = userRes.data ?? ({} as UserResponseDto);

  const invMediaBar = invMediabarData();
  const invData = invPublicProfilePage();

  if (publicUserRes.isFetching) return <Loader fullScreen />;
  return (
    <PageWrapper>
      <Sidebar name={name} uniqueName={uniqueName} avatar={avatar} />

      <MainLane
        user={publicUser}
        socialStats={socialStats}
        profileActions={
          <ConnectButton
            meId={meId}
            publicUserId={publicUserId}
            buttonRelatedUserId={publicUserId}
            followingStatus={followingStatus}
            invData={invData}
          />
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
            showBio={false}
            invData={invMediaBar}
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
