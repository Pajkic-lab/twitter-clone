import { ModalProvider } from 'styled-react-modal';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { Router } from './router';
import React from 'react';
import { AuthTrigger } from './customHooks/AuthTrigger';
import { useAppSelector } from './store/hooks';
import { GlobalStyle } from './GlobalStyle';
import { Colors } from './ui/styles';

export const App = () => {
  const styleSlice = useAppSelector((state) => state.style);
  return (
    <>
      <AuthTrigger />
      <GlobalStyle {...styleSlice} />
      <ThemeProvider theme={styleSlice.theme}>
        <ModalProvider backgroundComponent={ModalBackground}>
          <Router />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
};

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
`;
