import { AnyAsyncThunk, RejectedWithValueActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import {
  authUserThunk,
  signUpThunk,
  signInThunk,
  signOutThunk,
  checkNameUniqueness,
  createUserUniqueName,
} from './thunk'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { User } from 'types'

interface AuthState extends User {
  isLoading: boolean
  isAuth: boolean
  errorMessage: string
  isNameUnique: boolean | undefined
}

const initialState: AuthState = {
  id: null,
  name: '',
  email: '',
  avatar: '',
  cover: '',
  uniqueName: '',
  bio: '',
  location: '',
  website: '',
  birthDate: '',
  createdDate: '',
  isLoading: false,
  isAuth: Cookies.get('twitter-clone-auth-session') ? true : false,
  errorMessage: '',
  isNameUnique: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  /**
   * Do not destructure state inside extraReducers because code wont work for some reason
   */
  extraReducers: builder => {
    builder

      // Sign up logic
      .addCase(signUpThunk.fulfilled, state => {
        state.isAuth = true
      })
      .addCase(
        signUpThunk.rejected,
        (state, { payload }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message
        },
      )

      // Sign in logic
      .addCase(signInThunk.fulfilled, state => {
        state.isAuth = true
      })
      .addCase(
        signInThunk.rejected,
        (state, { payload }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message
        },
      )

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
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            state.uniqueName = payload.data.user.uniqueName as string
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
        state.isAuth = false
      })
      .addCase(signOutThunk.rejected, state => {
        state.errorMessage = ''
      })

      // Name is unique
      .addCase(
        checkNameUniqueness.fulfilled,
        (state, { payload }: PayloadAction<AxiosResponse<{ isNameUnique: boolean }, any> | undefined>) => {
          if (payload && payload.data) {
            state.isNameUnique = payload.data.isNameUnique
          }
        },
      )
      .addCase(
        checkNameUniqueness.rejected,
        (state, { payload }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message
        },
      )

      // Update unique name
      .addCase(
        createUserUniqueName.fulfilled,
        (state, { payload }: PayloadAction<AxiosResponse<{ uniqueName: string }, any> | undefined>) => {
          if (payload && payload.data) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            state.uniqueName = payload.data.uniqueName as string
          }
        },
      )
      .addCase(
        createUserUniqueName.rejected,
        (state, { payload }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message
        },
      )
  },
})

export default authSlice.reducer
