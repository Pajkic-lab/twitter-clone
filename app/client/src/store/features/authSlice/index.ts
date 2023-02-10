import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signUpThunk } from './thunk'
import { signInThunk } from './thunk'
import { User } from 'types'

interface AuthState extends User {
  userId: number | null
  isLoading: boolean
  isSubmiting: boolean
  errorMessage: string
}

const initialState: AuthState = {
  userId: null,
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isLoading: false,
  isSubmiting: false,
  errorMessage: 'catch error from server and refactor code',
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
      .addCase(signUpThunk.pending, ({ isSubmiting }) => {
        isSubmiting = true
      })
      .addCase(signUpThunk.fulfilled, ({ isSubmiting }) => {
        isSubmiting = false
      })
      .addCase(
        signUpThunk.rejected,
        ({ isSubmiting, errorMessage }, action) => {
          isSubmiting = false
          errorMessage = ''
        },
      )
      .addCase(signInThunk.pending, ({ isSubmiting }) => {
        isSubmiting = true
      })
      .addCase(signInThunk.fulfilled, ({ isSubmiting }) => {
        console.log('success')
        isSubmiting = false
      })
      .addCase(
        signInThunk.rejected,
        ({ isSubmiting, errorMessage }, action) => {
          errorMessage = ''
          isSubmiting = false
        },
      )
  },
})

export const { updateAuthData } = authSlice.actions

export default authSlice.reducer
