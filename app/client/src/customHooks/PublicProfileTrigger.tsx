import { getPublicProfile } from 'store/features/publicProfileSlice/thunk'
import { resetState } from 'store/features/publicProfileSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'

export const PublicProfileTrigger = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { name } = useAppSelector(state => state.publicProfile)
  const { id } = useAppSelector(state => state.auth)

  // console.log('params', params, typeof params) // stays for testing in prod

  let paramsId: number

  if (params.id) {
    paramsId = parseInt(params.id)
    // console.log('paramsId', paramsId, typeof paramsId) // stays for testing in prod
  }

  useEffect(() => {
    if (paramsId === id || typeof paramsId !== 'number') {
      navigate('/home')
    }
    if (paramsId && !name) {
      dispatch(resetState())
      void dispatch(getPublicProfile(paramsId))
    }
  }, [])
  return null
}
