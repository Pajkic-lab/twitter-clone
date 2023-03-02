import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPublicProfile } from './thunk'
import { PublicUser, User } from 'types'
import { AxiosResponse } from 'axios'

interface PublicProfileState extends Omit<User, 'email'> {
  isLoading: boolean
  errorMessage: string
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
}

export const publicProfileSlice = createSlice({
  name: 'publicProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Authenticate user
      .addCase(getPublicProfile.pending, state => {
        state.isLoading = true
      })
      .addCase(
        getPublicProfile.fulfilled,
        (state, { payload }: PayloadAction<AxiosResponse<{ user: PublicUser }, any> | undefined>) => {
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
          }
          state.isLoading = false
        },
      )
      .addCase(getPublicProfile.rejected, state => {
        state.errorMessage = ''
        state.isLoading = false
      })
  },
})

export default publicProfileSlice.reducer
