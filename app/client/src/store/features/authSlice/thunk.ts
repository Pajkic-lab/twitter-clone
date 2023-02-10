import { createAsyncThunk } from '@reduxjs/toolkit'
import { SignInUser, User } from 'types'
import http from 'http/api'

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (user: User, { rejectWithValue }) => {
    try {
      return await http.auth.signUp(user)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error)
      } else {
        console.log('Unexpected error', error)
      }
    }
  },
)

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (user: SignInUser, { rejectWithValue }) => {
    try {
      return await http.auth.signIn(user)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error)
      } else {
        console.log('Unexpected error', error)
      }
    }
  },
)
