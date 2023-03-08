import { getMostPopularProfiles } from './thunk'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'types'
import { AxiosResponse } from 'axios'

interface UtileState {
  mostPopularUsers: User[]
  errorMessage: string
}

const initialState: UtileState = {
  mostPopularUsers: [],
  errorMessage: '',
}

export const utileSlice = createSlice({
  name: 'utile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Most pupular profiles
      .addCase(
        getMostPopularProfiles.fulfilled,
        (state, { payload }: PayloadAction<AxiosResponse<{ mostPupularUsers: [] }, any> | undefined>) => {
          if (payload && payload.data) {
            state.mostPopularUsers = [...payload.data.mostPupularUsers]
          }
        },
      )
      .addCase(getMostPopularProfiles.rejected, state => {
        state.errorMessage = ''
      })
  },
})

export default utileSlice.reducer
