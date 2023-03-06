import { useAppSelector } from 'store/hooks'
import { Navigate } from 'react-router-dom'
import { Loader } from 'ui/Loader'
import { AuthType } from 'types'
import React from 'react'

export const Filter: React.FC<{ authType: AuthType; children: JSX.Element }> = ({ authType, children }) => {
  const { isAuth, isLoading } = useAppSelector(state => state.auth)
  const publicProfileIsLoading = useAppSelector(state => state.publicProfile.isLoading)

  const pageIsLoading = isLoading || publicProfileIsLoading

  return (authType === 'protected' && !isAuth) || (authType === 'guest' && isAuth) ? (
    <Navigate to={authType === 'protected' ? '/' : '/home'} replace />
  ) : pageIsLoading ? (
    <Loader fullScreen={true} />
  ) : (
    children
  )
}
