import { authUserThunk } from 'store/features/authSlice/thunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import React, { useEffect } from 'react'

export const AuthTrigger: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuth) {
      void dispatch(authUserThunk())
    }
  }, [isAuth])

  return null
}
