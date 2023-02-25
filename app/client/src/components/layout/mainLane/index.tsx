import { ProfileNavBar } from './navBar/ProfileNavBar'
import { HomeNavBar } from './navBar/HomeNavBar'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Colors } from 'ui/styles'
import React from 'react'

const lookupNavBarTable: { [key: string]: JSX.Element } = {
  '/home': <HomeNavBar />,
  '/profile': <ProfileNavBar />,
}

export const MainLane = () => {
  const location = useLocation()

  return <Wrapper>{lookupNavBarTable[location.pathname]}</Wrapper>
}

const Wrapper = styled.div`
  width: 600px;
  min-height: 100vh;
  border-left: 2px solid ${Colors.darkerGrey};
  border-right: 2px solid ${Colors.darkerGrey};
`
