import { PublicProfileTrigger } from 'customHooks/PublicProfileTrigger'
import { MainLane } from 'components/layout/mainLane'
import { MediaBar } from 'components/layout/mediaBar'
import { SideBar } from 'components/layout/SideBar'
import styled from 'styled-components'
import React from 'react'

export const PublicProfile: React.FC = () => {
  return (
    <Wrapper>
      <PublicProfileTrigger />
      <SideBar />
      <MainLane />
      <MediaBar />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`
