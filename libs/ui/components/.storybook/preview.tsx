import type { Preview } from '@storybook/react';

/**
 * Storybook preview configuration is in apps\client\.storybook\preview.tsx
 *
 */

const preview: Preview = {
  decorators: [(Story) => <Story />],
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
