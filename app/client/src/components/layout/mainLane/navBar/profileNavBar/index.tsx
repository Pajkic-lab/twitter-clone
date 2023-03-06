import { TweetsNavigation } from './TweetsNavigation'
import { AvatarAndOptions } from './AvatarAndOptions'
import { NavigationBar } from './NavigationBar'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { ProfileData } from './ProfileData'
import { SocialStats } from './SocialStats'
import styled from 'styled-components'
import { Colors } from 'ui/styles'
import { Cover } from './Cover'
import React from 'react'

export const ProfileNavBar: React.FC = () => {
  const { pathname } = useLocation()

  const { name, uniqueName, avatar, cover, bio, createdAt, location, website } = useAppSelector(
    pathname === '/profile' ? state => state.auth : state => state.publicProfile,
  )

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
        <SocialStats />
      </BioWrapper>
      <TweetsNavigation />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: sticky;
  border-bottom: 2px solid ${Colors.darkerGrey};
  backdrop-filter: blur(10px);
`

const BioWrapper = styled.div`
  padding: 0 1rem;
`
