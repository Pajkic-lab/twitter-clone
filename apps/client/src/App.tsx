import { BreakingPointSetter } from '@tw/ui/common';
import { ModalBackground } from '@tw/ui/components';
import { useAppSelector } from '@tw/ui/data-access';
import { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import { GlobalStyle } from './GlobalStyle';
import { Router } from './router';

export const App = () => {
  const styleSlice = useAppSelector((state) => state.style);

  return (
    <>
      <GlobalStyle {...styleSlice} />
      <BreakingPointSetter />
      <ThemeProvider theme={styleSlice.theme}>
        <ModalProvider backgroundComponent={ModalBackground}>
          <Router />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
};
