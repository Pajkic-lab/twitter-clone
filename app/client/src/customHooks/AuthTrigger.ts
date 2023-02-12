import { authUserThunk } from 'store/features/authSlice/thunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

export const AuthTrigger = () => {
  const dispatch = useAppDispatch()
  const authTriggerFlag = useAppSelector(state => state.auth.AuthTrigger)

  useEffect(() => {
    void dispatch(authUserThunk())
  }, [authTriggerFlag])

  return null
}
