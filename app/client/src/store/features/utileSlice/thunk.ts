import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import http from 'http/api'

export const getMostPopularProfiles = createAsyncThunk('utile/getMostPopularUsers', async (__, { rejectWithValue }) => {
  try {
    return await http.utile.getMostPopularUsers()
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
