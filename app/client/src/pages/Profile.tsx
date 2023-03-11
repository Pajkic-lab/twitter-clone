import { MediaBar } from 'components/layout/mediaBar'
import { MainLane } from 'components/layout/mainLane'
import { SideBar } from 'components/layout/SideBar'
import styled from 'styled-components'
import React from 'react'

export const Profile = () => {
  return (
    <Wrapper>
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
