import { Colors } from '@tw/ui/assets';
import { useAppSelector } from '@tw/ui/data-access';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { WhoToFollow } from './WhoToFollow';
import { FollowersList } from './body/FollowersList';
import { FollowingList } from './body/FollowingList';
import { PPFollowersList } from './body/PPFollowersList';
import { PPFollowingList } from './body/PPFollowingList';
import { HomeNavBar } from './navBar/HomeNavBar';
import { ProfileNavBar } from './navBar/profileNavBar';
import { NavigationBar } from './navBar/profileNavBar/NavigationBar';

export const MainLane: React.FC = () => {
  const location = useLocation();
  const params = useParams();

  const { name } = useAppSelector((state) => state.auth);
  const { followingCount } = useAppSelector((state) => state.auth);

  const lookupNavBarTable: { [key: string]: JSX.Element } = {
    '/home': <HomeNavBar />,
    '/profile': <ProfileNavBar />,
    [`/user/${params.id!}/unique-name/${params.name!}`]: <ProfileNavBar />,
    [`/profile/social/${params.option!}`]: <NavigationBar name={name} />,
    [`/user/${params.id!}/social/${params.option!}`]: (
      <NavigationBar name={name} />
    ),
  };

  const lookupBodyTable: { [key: string]: JSX.Element } = {
    '/home': followingCount < 1 ? <WhoToFollow /> : <></>,
    ['/profile/social/followers']: <FollowersList />,
    ['/profile/social/following']: <FollowingList />,
    [`/user/${params.id!}/social/followers`]: (
      <PPFollowersList userId={parseInt(params.id!)} />
    ),
    [`/user/${params.id!}/social/following`]: (
      <PPFollowingList userId={parseInt(params.id!)} />
    ),
  };

  return (
    <Wrapper>
      {lookupNavBarTable[location.pathname]}
      {lookupBodyTable[location.pathname]}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
  min-width: 600px;
  min-height: 100vh;
  border-left: 2px solid ${Colors.grayDark};
  border-right: 2px solid ${Colors.grayDark};
`;
