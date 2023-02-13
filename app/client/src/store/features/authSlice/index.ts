import { authUserThunk, signUpThunk, signInThunk, signOutThunk } from './thunk'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { User } from 'types'

interface AuthState extends User {
  isLoading: boolean

  isAuth: boolean
  errorMessage: string
}

const initialState: AuthState = {
  id: null,
  name: '',
  email: '',
  isLoading: false,

  isAuth: Cookies.get('twitter-clone-auth-session') ? true : false,
  errorMessage: 'catch exception from server and refactor code',
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
      .addCase(signUpThunk.fulfilled, state => {
        state.isAuth = true
      })
      .addCase(signUpThunk.rejected, state => {
        state.errorMessage = ''
      })

      // Sign in logic
      .addCase(signInThunk.fulfilled, state => {
        state.isAuth = true
      })
      .addCase(signInThunk.rejected, state => {
        state.errorMessage = ''
      })

      // Authenticate user
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

      // Sign out logic
      .addCase(signOutThunk.fulfilled, state => {
        Cookies.remove('twitter-clone-auth-session')
        Object.assign(state, initialState)
        // window.location.reload()
      })
      .addCase(signOutThunk.rejected, state => {
        state.errorMessage = ''
      })
  },
})

export const { updateAuthData } = authSlice.actions

export default authSlice.reducer
