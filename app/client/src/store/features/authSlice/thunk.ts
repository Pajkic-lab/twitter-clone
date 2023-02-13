import { createAsyncThunk } from '@reduxjs/toolkit'
import { VerifyUser, CreateUser } from 'types'
import http from 'http/api'

export const signUpThunk = createAsyncThunk('auth/signUp', async (user: CreateUser, { rejectWithValue }) => {
  try {
    return await http.auth.signUp(user)
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error)
    }
  }
})

export const signInThunk = createAsyncThunk('auth/signIn', async (user: VerifyUser, { rejectWithValue }) => {
  try {
    return await http.auth.signIn(user)
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error)
    }
  }
})

export const authUserThunk = createAsyncThunk('auth/authUser', async () => {
  try {
    return await http.auth.authUser()
  } catch (error) {
    if (error instanceof Error) {
      // return rejectWithValue(error)
    }
  }
})

export const signOutThunk = createAsyncThunk('auth/signOut', async () => {
  try {
    return await http.auth.signOut()
  } catch (error) {
    if (error instanceof Error) {
      // return rejectWithValue(error)
    }
  }
})
