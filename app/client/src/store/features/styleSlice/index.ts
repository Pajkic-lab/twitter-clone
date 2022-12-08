import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPostsThunk } from './thunk'
import { Post } from 'types'

interface StyleState {
  id: number
  userName: string
  email: string
  posts: Post[]
  loading: boolean
  customCss: string
  theme: {
    space: number[]
    breakpoints: string[]
    isBodyScrollable: boolean
  }
}

const initialState: StyleState = {
  id: 1,
  userName: 'testic',
  email: 'test@hmail.com',
  posts: [],
  loading: false,
  customCss: '',
  theme: {
    space: [0, 8, 16, 24, 32],
    breakpoints: ['32em', '48em', '64em'],
    isBodyScrollable: true,
  },
}

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    updateUsername: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsThunk.pending, state => {
        state.loading = true
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload.data
      })
      .addCase(fetchPostsThunk.rejected, state => {
        state.loading = false
      })
  },
})

export const { updateUsername } = styleSlice.actions

export default styleSlice.reducer
