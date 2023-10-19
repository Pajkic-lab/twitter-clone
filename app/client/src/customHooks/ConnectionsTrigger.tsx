import { getFollowersThunk, getFollowingUsersThunk } from 'store/features/utileSlice/thunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import React, { useEffect } from 'react'

export const ConnectionsTrigger = () => {
  const dispatch = useAppDispatch()

  const { followerOffset, followerLimit, followingOffset, followingLimit } = useAppSelector(state => state.utile)

  useEffect(() => {
    const getFollowersHelper = async () => {
      if (!followerOffset) {
        await dispatch(getFollowersThunk({ followerOffset, followerLimit }))
      }

      if (!followingOffset) {
        await dispatch(getFollowingUsersThunk({ followingOffset, followingLimit }))
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getFollowersHelper()
  }, [])

  return null
}
