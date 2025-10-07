import { GlobalStyle, theme } from '@tw/theme';
import { BreakingPointSetter } from '@tw/ui/common';
import { ModalBackground } from '@tw/ui/components';
import { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import { Router } from './router';

export const App = () => {
  return (
    <>
      <BreakingPointSetter />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ModalProvider backgroundComponent={ModalBackground}>
          <Router />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
};
