import { getPublicProfile } from 'store/features/publicProfileSlice/thunk'
import { resetState } from 'store/features/publicProfileSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { MainLane } from 'components/layout/mainLane'
import { SideBar } from 'components/layout/SideBar'
import React, { useEffect } from 'react'
import styled from 'styled-components'

export const PublicProfile = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { name } = useAppSelector(state => state.publicProfile)
  const { id } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (parseInt(params.id!) === id || typeof parseInt(params.id!) !== 'number') {
      navigate('/home')
    }
    if (params.id && !name) {
      // eslint-disable-next-line curly
      if (parseInt(params.id) === id) return
      dispatch(resetState())
      void dispatch(getPublicProfile(parseInt(params.id)))
    }
  }, [])

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
