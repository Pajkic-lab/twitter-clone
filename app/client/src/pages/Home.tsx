import { SetAccountModal } from 'components/modals/SetAccountModal'
import { signOutThunk } from 'store/features/authSlice/thunk'
import { useAppDispatch } from 'store/hooks'
import React from 'react'

export const Home = () => {
  const dispatch = useAppDispatch()

  const logOut = () => {
    void dispatch(signOutThunk())
  }

  return (
    <>
      <SetAccountModal />
      <button onClick={logOut}>Logout</button>
    </>
  )
}
