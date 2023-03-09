import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import http from 'http/api'

export const getPublicProfile = createAsyncThunk('publicProfile/getUser', async (id: number, { rejectWithValue }) => {
  try {
    // console.log('getPublicProfile thunk', id, typeof id) // stays for testing in prod
    console.log('getPublicProfile thunk response', await http.auth.getPublicUser(id)) // stays for testing in prod
    return await http.auth.getPublicUser(id)
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
