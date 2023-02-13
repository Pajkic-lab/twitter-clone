import { useAppSelector } from 'store/hooks'
import { Navigate } from 'react-router-dom'
import { Loader } from 'ui/Loader'
import React from 'react'

type AuthType = 'protected' | 'guest'

export const Filter: React.FC<{ authType: AuthType; children: JSX.Element }> = ({ authType, children }) => {
  const { isAuth, isLoading } = useAppSelector(state => state.auth)

  return (authType === 'protected' && !isAuth) || (authType === 'guest' && isAuth) ? (
    <Navigate to={authType === 'protected' ? '/' : '/home'} replace />
  ) : isLoading ? (
    <Loader fullScreen={true} />
  ) : (
    children
  )
}
