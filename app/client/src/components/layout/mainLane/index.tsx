import { useLocation, useParams } from 'react-router-dom'
import { ProfileNavBar } from './navBar/profileNavBar'
import { HomeNavBar } from './navBar/HomeNavBar'
import { useAppSelector } from 'store/hooks'
import { WhoToFollow } from './WhoToFollow'
import styled from 'styled-components'
import { Colors } from 'ui/styles'
import React from 'react'

export const MainLane = () => {
  const location = useLocation()
  const params = useParams()

  const { followingCount } = useAppSelector(state => state.auth)

  const lookupNavBarTable: { [key: string]: JSX.Element } = {
    '/home': <HomeNavBar />,
    '/profile': <ProfileNavBar />,
    [`/user/${params.id!}/unique-name/${params.name!}`]: <ProfileNavBar />,
  }

  const lookupBodyTable: { [key: string]: JSX.Element } = {
    '/home': <WhoToFollow />,
  }

  return (
    <Wrapper>
      {lookupNavBarTable[location.pathname]}
      {!followingCount && lookupBodyTable[location.pathname]}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 600px;
  min-height: 100vh;
  border-left: 2px solid ${Colors.darkerGrey};
  border-right: 2px solid ${Colors.darkerGrey};
`
