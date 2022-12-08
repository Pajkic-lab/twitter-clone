/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from './components/router/Router'
import { ThemeProvider } from 'styled-components'
import { useAppSelector } from 'store/hooks'
import { GlobalStyle } from 'GlobalStyle'
import React from 'react'

export const App = () => {
  const styleSlice = useAppSelector(state => state.style)
  return (
    <>
      <GlobalStyle {...styleSlice} />
      <ThemeProvider theme={styleSlice.theme}>
        <Router />
      </ThemeProvider>
    </>
  )
}
