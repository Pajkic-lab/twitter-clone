import { Router } from './components/router/Router'
import { ThemeProvider } from 'styled-components'
import { useAppSelector } from 'store/hooks'
import { GlobalStyle } from 'GlobalStyle'
import React from 'react'
import { ModalProvider } from 'styled-react-modal'
import styled from 'styled-components'
import { Colors } from 'ui/styles'

export const App = () => {
  const styleSlice = useAppSelector(state => state.style)
  return (
    <>
      <GlobalStyle {...styleSlice} />
      <ThemeProvider theme={styleSlice.theme}>
        <ModalProvider backgroundComponent={ModalBackground}>
          <Router />
        </ModalProvider>
      </ThemeProvider>
    </>
  )
}

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  opacity: 100%;
  background-color: ${Colors.backgroundShadow};
`
