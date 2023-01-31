import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signUpThunk } from './thunk'
import { User } from 'types'

interface AuthState extends User {
  isLoading: boolean
}

const initialState: AuthState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthData: (
      state,
      {
        payload: { name, email, password, confirmPassword },
      }: PayloadAction<AuthState>,
    ) => {
      state.name = name
      state.email = email
      state.password = password
      state.confirmPassword = confirmPassword
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpThunk.pending, state => {
        // state.loading = true
        console.log(1, 'panding')
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        // state.loading = false
        // state.posts = action.payload.data
        console.log(2, 'success')
      })
      .addCase(signUpThunk.rejected, state => {
        // state.loading = false
      })
  },
})

export const { updateAuthData } = authSlice.actions

export default authSlice.reducer
