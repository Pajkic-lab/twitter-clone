import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { fetchPostsThunk } from './thunk'

interface StyleState {
  name: string
  email: string
}

const initialState: StyleState = {
  name: 'testic',
  email: 'test@hmail.com',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state, action: PayloadAction<StyleState>) => {
      console.log(action)
      state.name = action.payload.name
      state.email = action.payload.email
      //   state.email = action.payload
    },
  },
  //   extraReducers: builder => {
  //     builder
  //       .addCase(fetchPostsThunk.pending, state => {
  //         state.loading = true
  //       })
  //       .addCase(fetchPostsThunk.fulfilled, (state, action) => {
  //         state.loading = false
  //         state.posts = action.payload.data
  //       })
  //       .addCase(fetchPostsThunk.rejected, state => {
  //         state.loading = false
  //       })
  //   },
})

export const { updateUsername } = userSlice.actions

export default userSlice.reducer
