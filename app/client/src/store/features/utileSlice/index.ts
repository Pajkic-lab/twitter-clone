import { getMostPopularProfiles, searchThunk } from './thunk'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'types'
import { AxiosResponse } from 'axios'

interface UtileState {
  mostPopularUsers: User[]
  searchRespons: User[]
  searchIsLoading: boolean
  errorMessage: string
}

const initialState: UtileState = {
  mostPopularUsers: [],
  searchRespons: [],
  searchIsLoading: false,
  errorMessage: '',
}

export const utileSlice = createSlice({
  name: 'utile',
  initialState,
  reducers: {
    resetSearchRespons: state => {
      state.searchRespons = []
    },
  },
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

      // Search response
      .addCase(searchThunk.pending, state => {
        state.searchIsLoading = true
      })
      .addCase(
        searchThunk.fulfilled,
        (state, { payload }: PayloadAction<AxiosResponse<{ searchRespons: [] }, any> | undefined>) => {
          if (payload && payload.data) {
            state.searchRespons = payload.data.searchRespons
          }
          state.searchIsLoading = false
        },
      )
      .addCase(searchThunk.rejected, state => {
        state.errorMessage = ''
        state.searchIsLoading = false
      })
  },
})

export const { resetSearchRespons } = utileSlice.actions

export default utileSlice.reducer
