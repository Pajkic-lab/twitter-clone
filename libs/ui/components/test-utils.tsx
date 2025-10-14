import { render, RenderOptions } from '@testing-library/react';
import { GlobalStyle, theme } from '@tw/theme';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </MemoryRouter>
    </>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
