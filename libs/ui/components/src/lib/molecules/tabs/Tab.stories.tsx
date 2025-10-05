import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import { GlobalStyle, theme } from '@tw/theme';
import { ThemeProvider } from 'styled-components';
import { Tabs } from './Tabs';

const paragraphs = faker.lorem.paragraphs;

const tabs = [
  { content: <div>1. {paragraphs(8)}</div>, tabName: 'Profile' },
  { content: <div>2. {paragraphs(2)} </div>, tabName: 'Account' },
  {
    content: <div>3. {paragraphs(20)} </div>,
    tabName: 'Our best candidates',
  },
  { content: <div>4. {paragraphs(4)} </div>, tabName: '15.' },
  {
    content: <div>5. {paragraphs(23)} </div>,
    tabName: 'Lorem Ipsum',
  },
];

const meta: Meta<typeof Tabs> = {
  title: 'Atoms/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {},
  args: {
    tabs,
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

export const NonFirstDefault: Story = {
  args: {
    defaultTab: 3,
  },
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      { tabName: 'Login', content: <div>Login Form</div> },
      { tabName: 'Sign Up', content: <div>Sign Up Form</div> },
    ],
  },
};

export const ShortLabels: Story = {
  args: {
    tabs: [
      { tabName: 'Tab 1', content: <div>First tab content</div> },
      { tabName: 'Tab 2', content: <div>Second tab content</div> },
      { tabName: 'Tab 3', content: <div>Third tab content</div> },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    tabs: [
      {
        tabName: 'Very Long Tab Name Example',
        content: <div>Content 1</div>,
      },
      {
        tabName: 'Another Extremely Long Label',
        content: <div>Content 2</div>,
      },
      {
        tabName: 'Short',
        content: <div>Content 3</div>,
      },
    ],
  },
};

export const WithRichContent: Story = {
  args: {
    tabs: [
      {
        tabName: 'Images',
        content: (
          <div>
            <h2>Image Gallery</h2>
            <p>Image content would go here</p>
          </div>
        ),
      },
      {
        tabName: 'Videos',
        content: (
          <div>
            <h2>Video Library</h2>
            <p>Video content would go here</p>
          </div>
        ),
      },
    ],
  },
};
