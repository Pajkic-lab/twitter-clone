import type { Meta, StoryObj } from '@storybook/react';
import { GlobalStyle, theme } from '@tw/theme';
import { ThemeProvider } from 'styled-components';
import { TabGroup } from './TabGroup';

// Is there other way than everytime import ThemeProvider, is there global setup for this?
const meta: Meta<typeof TabGroup> = {
  title: 'Atoms/TabGroup',
  component: TabGroup,
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </>
    ),
  ],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TabGroup>;

export const Default: Story = {
  args: {
    tabs: [
      {
        tabName: 'Profile',
        content: <div style={{ padding: 16, color: 'white' }}>This is the Profile tab content</div>,
      },
      {
        tabName: 'Settings',
        content: <div style={{ padding: 16, color: 'white' }}>Here you can change settings</div>,
      },
      {
        tabName: 'Billing',
        content: <div style={{ padding: 16, color: 'white' }}>Manage your billing information</div>,
      },
    ],
  },
};

export const WithLongContent: Story = {
  args: {
    tabs: [
      {
        tabName: 'Overview',
        content: (
          <div style={{ padding: 16 }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
              libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
              imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
              porta.
            </p>
          </div>
        ),
      },
      {
        tabName: 'Details',
        content: (
          <div style={{ padding: 16 }}>
            <ul>
              <li>Detail 1</li>
              <li>Detail 2</li>
              <li>Detail 3</li>
            </ul>
          </div>
        ),
      },
    ],
    defaultTab: 0,
  },
};
