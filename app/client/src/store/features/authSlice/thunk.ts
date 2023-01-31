import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from 'types'
import http from 'http/api'

export const signUpThunk = createAsyncThunk('auth/signUp', (user: User) => {
  return http.auth.signUp(user)
})
