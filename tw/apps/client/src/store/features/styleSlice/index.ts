import { createSlice } from '@reduxjs/toolkit'

interface StyleState {
  customCss: string
  theme: {
    space: number[]
    breakpoints: string[]
    isBodyScrollable: boolean
  }
}

const initialState: StyleState = {
  customCss: '',
  theme: {
    space: [0, 8, 16, 24, 32],
    breakpoints: ['32em', '48em', '64em'],
    isBodyScrollable: true,
  },
}

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {},
})

export default styleSlice.reducer
