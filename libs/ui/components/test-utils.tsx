import { render, RenderOptions } from '@testing-library/react';
import { GlobalStyle, theme } from '@tw/theme';
import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
