import { NavigationBar } from './navBar/profileNavBar/NavigationBar'
import { useLocation, useParams } from 'react-router-dom'
import { PPFollowersList } from './body/PPFollowersList'
import { PPFollowingList } from './body/PPFollowingList'
import { ProfileNavBar } from './navBar/profileNavBar'
import { FollowingList } from './body/FollowingList'
import { FollowersList } from './body/FollowersList'
import { HomeNavBar } from './navBar/HomeNavBar'
import { useAppSelector } from 'store/hooks'
import { WhoToFollow } from './WhoToFollow'
import styled from 'styled-components'
import { Colors } from 'ui/styles'
import React from 'react'

export const MainLane: React.FC = () => {
  const location = useLocation()
  const params = useParams()

  const { name } = useAppSelector(state => state.auth)

  const lookupNavBarTable: { [key: string]: JSX.Element } = {
    '/home': <HomeNavBar />,
    '/profile': <ProfileNavBar />,
    [`/user/${params.id!}/unique-name/${params.name!}`]: <ProfileNavBar />,
    [`/profile/social/${params.option!}`]: <NavigationBar name={name} />,
  }

  const lookupBodyTable: { [key: string]: JSX.Element } = {
    '/home': <WhoToFollow />,
    ['/profile/social/followers']: <FollowersList />,
    ['/profile/social/following']: <FollowingList />,
    [`/user/${params.id!}/unique-name/${params.uniqueName!}/social/followers`]: (
      <PPFollowersList userId={parseInt(params.id!)} />
    ),
    [`/user/${params.id!}/unique-name/${params.uniqueName!}/social/following`]: <PPFollowingList />,
  }

  return (
    <Wrapper>
      {lookupNavBarTable[location.pathname]}
      {lookupBodyTable[location.pathname]}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 600px;
  min-width: 600px;
  min-height: 100vh;
  border-left: 2px solid ${Colors.darkerGrey};
  border-right: 2px solid ${Colors.darkerGrey};
`
