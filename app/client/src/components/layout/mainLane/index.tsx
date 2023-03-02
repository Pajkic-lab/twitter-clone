import { PublicProfileNavBar } from './navBar/PublicProfileNavBar'
import { useLocation, useParams } from 'react-router-dom'
import { ProfileNavBar } from './navBar/ProfileNavBar'
import { HomeNavBar } from './navBar/HomeNavBar'
import styled from 'styled-components'
import { Colors } from 'ui/styles'
import React from 'react'

export const MainLane = () => {
  const location = useLocation()
  const params = useParams()

  const lookupNavBarTable: { [key: string]: JSX.Element } = {
    '/home': <HomeNavBar />,
    '/profile': <ProfileNavBar />,
    [`/user/${params.id}/unique-name/${params.name}`]: <PublicProfileNavBar />,
  }

  return <Wrapper>{lookupNavBarTable[location.pathname]}</Wrapper>
}

const Wrapper = styled.div`
  width: 600px;
  min-height: 100vh;
  border-left: 2px solid ${Colors.darkerGrey};
  border-right: 2px solid ${Colors.darkerGrey};
`
