import { authUserThunk, signUpThunk, signInThunk } from './thunk'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { User } from 'types'

interface AuthState extends User {
  isLoading: boolean
  isSubmiting: boolean
  errorMessage: string
  AuthTrigger: boolean
}

const initialState: AuthState = {
  id: null,
  name: '',
  email: '',
  isLoading: false,
  isSubmiting: false,
  errorMessage: 'catch exception from server and refactor code',
  AuthTrigger: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthData: (state, { payload: { name, email } }: PayloadAction<AuthState>) => {
      state.name = name
      state.email = email
    },
  },
  /**
   * Do not destructure state inside extraReducers because code wont work for some reason
   */
  extraReducers: builder => {
    builder

      // Sign up logic
      .addCase(signUpThunk.pending, state => {
        state.isSubmiting = true
      })
      .addCase(signUpThunk.fulfilled, state => {
        state.isSubmiting = false
        state.AuthTrigger = true
      })
      .addCase(signUpThunk.rejected, state => {
        state.errorMessage = ''
        state.isSubmiting = false
      })

      // // Sign in logic
      .addCase(signInThunk.pending, state => {
        state.isSubmiting = true
      })
      .addCase(signInThunk.fulfilled, state => {
        state.isSubmiting = false
        state.AuthTrigger = true
      })
      .addCase(signInThunk.rejected, state => {
        state.errorMessage = ''
        state.isSubmiting = false
      })

      // // Authenticate user
      .addCase(authUserThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(
        authUserThunk.fulfilled,
        (state, { payload }: PayloadAction<AxiosResponse<{ user: User }, any> | undefined>) => {
          if (payload && payload.data) {
            state.id = payload.data.user.id as number
            state.name = payload.data.user.name
            state.email = payload.data.user.email
          }
          state.isLoading = false
        },
      )
      .addCase(authUserThunk.rejected, state => {
        state.errorMessage = ''
        state.isLoading = false
      })
  },
})

export const { updateAuthData } = authSlice.actions

export default authSlice.reducer
