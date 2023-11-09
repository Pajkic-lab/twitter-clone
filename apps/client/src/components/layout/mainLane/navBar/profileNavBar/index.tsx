import { TweetsNavigation } from './TweetsNavigation';
import { AvatarAndOptions } from './AvatarAndOptions';
import { NavigationBar } from './NavigationBar';
import { useLocation } from 'react-router-dom';
import { ProfileData } from './ProfileData';
import { SocialStats } from './SocialStats';
import styled from 'styled-components';
import { Cover } from './Cover';
import React from 'react';
import { useAppSelector } from 'apps/client/src/store/hooks';
import { Colors } from 'apps/client/src/ui/styles';

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
  border-bottom: 2px solid ${Colors.darkerGrey};
  backdrop-filter: blur(10px);
`;

const BioWrapper = styled.div`
  padding: 0 1rem;
`;
