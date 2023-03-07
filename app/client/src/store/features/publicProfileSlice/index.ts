import { followUserThunk, unFollowUserThunk } from '../authSlice/thunk'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicUser, SocialStats, User } from 'types'
import { getPublicProfile } from './thunk'
import { AxiosResponse } from 'axios'

interface PublicProfileState extends Omit<User, 'email'> {
  isLoading: boolean
  errorMessage: string
  followingCount: number
  followersCount: number
  followIsSubmitting: boolean
  followingStatus: boolean
}

const initialState: PublicProfileState = {
  id: null,
  name: '',
  avatar: '',
  cover: '',
  uniqueName: '',
  bio: '',
  location: '',
  website: '',
  createdAt: '',
  isLoading: false,
  errorMessage: '',
  followingCount: 0,
  followersCount: 0,
  followIsSubmitting: false,
  followingStatus: false,
}

export const publicProfileSlice = createSlice({
  name: 'publicProfile',
  initialState,
  reducers: {
    resetState: state => {
      return initialState
    },
  },
  extraReducers: builder => {
    builder

      // Get user
      .addCase(getPublicProfile.pending, state => {
        state.isLoading = true
      })
      .addCase(
        getPublicProfile.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ user: PublicUser; socialStats: SocialStats; followingStatus: boolean }, any> | undefined
          >,
        ) => {
          if (payload && payload.data) {
            // console.log(payload)
            state.id = payload.data.user.id as number
            state.name = payload.data.user.name
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            state.uniqueName = payload.data.user.uniqueName as string
            state.avatar = payload.data.user.avatar
            state.cover = payload.data.user.cover
            state.bio = payload.data.user.bio
            state.location = payload.data.user.location
            state.website = payload.data.user.website
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            state.createdAt = payload.data.user.createdAt as string
            state.followingCount = payload.data.socialStats.followingCount
            state.followersCount = payload.data.socialStats.followersCount
            state.followingStatus = payload.data.followingStatus
          }
          state.isLoading = false
        },
      )
      .addCase(getPublicProfile.rejected, state => {
        state.errorMessage = ''
        state.isLoading = false
      })

      // Follow user
      .addCase(followUserThunk.pending, state => {
        state.followIsSubmitting = true
      })
      .addCase(followUserThunk.fulfilled, state => {
        state.followersCount = state.followersCount + 1
        state.followingStatus = true
        state.followIsSubmitting = false
      })
      .addCase(followUserThunk.rejected, state => {
        state.errorMessage = ''
        state.followIsSubmitting = false
      })

      // Unfollow user
      .addCase(unFollowUserThunk.pending, state => {
        state.followIsSubmitting = true
      })
      .addCase(unFollowUserThunk.fulfilled, state => {
        state.followersCount = state.followersCount - 1
        state.followingStatus = false
        state.followIsSubmitting = false
      })
      .addCase(unFollowUserThunk.rejected, state => {
        state.errorMessage = ''
        state.followIsSubmitting = false
      })
  },
})

export const { resetState } = publicProfileSlice.actions

export default publicProfileSlice.reducer
