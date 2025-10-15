import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle, theme } from '@tw/theme';
import { MemoryRouter } from 'react-router-dom'; // is this needed any more?
import { ThemeProvider } from 'styled-components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <MemoryRouter>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Story />
            </QueryClientProvider>
          </ThemeProvider>
        </MemoryRouter>
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
