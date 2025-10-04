import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    // client stories
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    // libraries stories
    '../../../libs/ui/components/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@nx/react/plugins/storybook',
    // '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};

export default config;
