import { Colors } from '@tw/ui/assets';
import { useAppSelector } from '@tw/ui/data-access';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AvatarAndOptions } from './AvatarAndOptions';
import { Cover } from './Cover';
import { NavigationBar } from './NavigationBar';
import { ProfileData } from './ProfileData';
import { SocialStats } from './SocialStats';
import { TweetsNavigation } from './TweetsNavigation';

export const ProfileNavBar: React.FC = () => {
  const { pathname } = useLocation();

  const {
    id,
    name,
    uniqueName,
    avatar,
    cover,
    bio,
    createdAt,
    location,
    website,
    followersCount,
    followingCount,
  } = useAppSelector(
    pathname === '/profile'
      ? (state) => state.auth
      : (state) => state.publicProfile
  );

  return (
    <Wrapper>
      <NavigationBar name={name} />
      <Cover cover={cover} />
      <AvatarAndOptions avatar={avatar} pathname={pathname} />
      <BioWrapper>
        <ProfileData
          name={name}
          uniqueName={uniqueName}
          bio={bio}
          location={location}
          website={website}
          createdAt={createdAt}
        />
        <SocialStats
          followersCount={followersCount}
          followingCount={followingCount}
          id={id}
          uniqueName={uniqueName}
          pathname={pathname}
        />
      </BioWrapper>
      <TweetsNavigation />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  border-bottom: 2px solid ${Colors.grayDark};
  backdrop-filter: blur(10px);
`;

const BioWrapper = styled.div`
  padding: 0 1rem;
`;
