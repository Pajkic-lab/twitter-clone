import { getPublicProfile } from 'store/features/publicProfileSlice/thunk'
import { SetAccountModal } from 'components/modals/SetAccountModal'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { MainLane } from 'components/layout/mainLane'
import { SideBar } from 'components/layout/SideBar'
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import styled from 'styled-components'

export const PublicProfile = () => {
  const dispatch = useAppDispatch()
  const params = useParams()

  const { name } = useAppSelector(state => state.publicProfile)

  useEffect(() => {
    if (params.id && !name) {
      void dispatch(getPublicProfile(parseInt(params.id)))
    }
  }, [])

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
