import { SetAccountModal } from 'components/modals/SetAccountModal'
import { signOutThunk } from 'store/features/authSlice/thunk'
import { MainLane } from 'ui/layout/mainLane'
import { SideBar } from 'ui/layout/SideBar'
import styled from 'styled-components'
import React from 'react'

export const Home = () => {
  return (
    <Wrapper>
      <SetAccountModal />
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
