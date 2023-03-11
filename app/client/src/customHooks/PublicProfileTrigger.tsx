import { getPublicProfile } from 'store/features/publicProfileSlice/thunk'
import { resetState } from 'store/features/publicProfileSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'

export const PublicProfileTrigger: React.FC = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { name, errorMessage } = useAppSelector(state => state.publicProfile)
  const publicProfileId = useAppSelector(state => state.publicProfile.id)

  const { id } = useAppSelector(state => state.auth)

  let paramsId: number

  if (params.id) {
    paramsId = parseInt(params.id)
  }

  useEffect(() => {
    if (paramsId === id || typeof paramsId !== 'number') {
      navigate('/')
    }
    if (errorMessage === 'no existing user') {
      navigate('/')
    }
    if (paramsId && publicProfileId !== paramsId) {
      dispatch(resetState())
      void dispatch(getPublicProfile(paramsId))
    }
  }, [errorMessage, params.id])

  return null
}
