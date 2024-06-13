import { FollowerListResponseDto } from '@tw/data';
import {
  InvalidationData,
  invPublicProfileFollowingPage,
  invPublicProfileMediabarData,
} from '@tw/ui/common';
import { Contacts, Loader, Trends, UserLIst } from '@tw/ui/components';
import {
  useMostPopularUsersQuery,
  usePublicProfileFollowingInfQuery,
  usePublicProfileQuery,
  useUserQuery,
} from '@tw/ui/data-access';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

const FOLLOWING_LIST_SIZE_LIMIT = 20;
const MEDIA_BAR_USER_LIST_TITLE = 'Who to follow';

export const PublicProfileFollowingPage = () => {
  const params = useParams();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const publicUserId = Number(params?.userId);

  const { data: user } = useUserQuery();
  const publicUserRes = usePublicProfileQuery(publicUserId);

  const { data: mostPopularUsers, isFetching: mostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    data,
    fetchNextPage,
    isFetching: userListLoading,
    hasNextPage,
  } = usePublicProfileFollowingInfQuery(
    publicUserId,
    FOLLOWING_LIST_SIZE_LIMIT
  );

  const publicUser = publicUserRes?.data?.user;

  const userList: FollowerListResponseDto[] = data?.pages?.flat() ?? [];
  let noDataText = 'user does not follow anyone else';
  if (publicUser) {
    noDataText = `${publicUser.name} does not follow anyone else`;
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const [invData, setInvData] = useState<InvalidationData>(
    invPublicProfileFollowingPage(userList, mostPopularUsers)
  );

  const invMediaBar = invPublicProfileMediabarData();

  useEffect(() => {
    const invalidateData = invPublicProfileFollowingPage(
      userList,
      mostPopularUsers
    );
    setInvData(invalidateData);
  }, [userList, mostPopularUsers]);

  if (!user || !publicUser) return <Loader fullScreen />;
  return (
    <Contacts
      user={user}
      pubLicUser={publicUser}
      userList={userList}
      userListLoading={userListLoading}
      infScrollElRef={ref}
      hasMoreData={hasNextPage}
      noDataText={noDataText}
      invData={invData}
      mediabarTopWindowChilde={
        <UserLIst
          meId={user.id}
          publicUserId={publicUserId}
          title={MEDIA_BAR_USER_LIST_TITLE}
          userList={mostPopularUsers}
          userListLoading={mostPopularUsersLoading}
          showBio={false}
          invData={invMediaBar}
        />
      }
      mediabarBottomWindowChilde={<Trends />}
    />
  );
};
