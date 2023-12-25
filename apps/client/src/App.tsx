import { Colors } from '@tw/ui/assets';
import { useAppSelector } from '@tw/ui/data-access';
import styled, { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import { GlobalStyle } from './GlobalStyle';
import { AuthTrigger } from './customHooks/AuthTrigger';
import { Router } from './router';

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
  background-color: ${Colors.grayModalBackgroundShadow};
`;
