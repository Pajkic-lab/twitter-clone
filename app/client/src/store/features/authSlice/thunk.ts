import { createAsyncThunk } from '@reduxjs/toolkit'
import { VerifyUser, CreateUser } from 'types'
import { isAxiosError } from 'axios'
import http from 'http/api'

export const signUpThunk = createAsyncThunk('auth/signUp', async (user: CreateUser, { rejectWithValue }) => {
  try {
    return await http.auth.signUp(user)
  } catch (error) {
    if (error instanceof Error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue({ message: error.message })
      }
    }
  }
})

export const signInThunk = createAsyncThunk('auth/signIn', async (user: VerifyUser, { rejectWithValue }) => {
  try {
    return await http.auth.signIn(user)
  } catch (error) {
    if (error instanceof Error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue({ message: error.message })
      }
    }
  }
})

export const authenticateViaGoogle = createAsyncThunk('auth/google', async (__, { rejectWithValue }) => {
  try {
    return await http.auth.googleAuthenticate()
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error)
    }
  }
})

export const authUserThunk = createAsyncThunk('auth/authUser', async (__, { rejectWithValue }) => {
  try {
    return await http.auth.authUser()
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error)
    }
  }
})

export const signOutThunk = createAsyncThunk('auth/signOut', async (__, { rejectWithValue }) => {
  try {
    return await http.auth.signOut()
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error)
    }
  }
})

export const checkNameUniqueness = createAsyncThunk(
  'auth/checkNameUniqueness',
  async (uniqueName: string, { rejectWithValue }) => {
    try {
      return await http.auth.checkNameUniqueness(uniqueName)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error)
      }
    }
  },
)

export const updateUserUniqueName = createAsyncThunk(
  'auth/createuUserUniqueName',
  async (uniqueName: string, { rejectWithValue }) => {
    try {
      return await http.auth.updateUserUniqueName(uniqueName)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error)
      }
    }
  },
)
