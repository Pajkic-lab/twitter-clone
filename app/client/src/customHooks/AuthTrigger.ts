import { authUserThunk } from 'store/features/authSlice/thunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import React, { useEffect } from 'react'

export const AuthTrigger = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state => state.auth.isAuth)

  useEffect(() => {
    if (isAuthenticated) {
      void dispatch(authUserThunk())
    }
  }, [isAuthenticated])

  return null
}
