import React from 'react'
import styled from 'styled-components'
import { MainLane } from 'ui/layout/mainLane'
import { SideBar } from 'ui/layout/SideBar'

export const Profile = () => {
  return (
    <Wrapper>
      <SideBar />
      <MainLane />
      {/**trendBar/ mediaBar */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`
