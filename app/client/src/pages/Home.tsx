import { SetAccountModal } from 'components/modals/SetAccountModal'
import { signOutThunk } from 'store/features/authSlice/thunk'
import { useAppDispatch } from 'store/hooks'
import { SideBar } from 'ui/layout/SideBar'
import styled from 'styled-components'
import React from 'react'

export const Home = () => {
  const dispatch = useAppDispatch()

  const logOut = () => {
    void dispatch(signOutThunk())
  }

  return (
    <Wrapper>
      <SetAccountModal />
      <SideBar />
      {/**mainLane */}
      {/**trendBar/ mediaBar */}
      {/* <button onClick={logOut}>Logout</button> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100vh;
`
