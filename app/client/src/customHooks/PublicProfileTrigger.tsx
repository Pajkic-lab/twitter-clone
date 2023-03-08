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
  return null
}
