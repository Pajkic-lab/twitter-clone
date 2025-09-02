import { BreakingPointSetter } from '@tw/ui/common';
import { ModalBackground } from '@tw/ui/components';
import { ModalProvider } from 'styled-react-modal';
import { GlobalStyle } from './GlobalStyle';
import { Router } from './router';

//
export const App = () => {
  return (
    <>
      <GlobalStyle />
      <BreakingPointSetter />
      <ModalProvider backgroundComponent={ModalBackground}>
        <Router />
      </ModalProvider>
    </>
  );
};
