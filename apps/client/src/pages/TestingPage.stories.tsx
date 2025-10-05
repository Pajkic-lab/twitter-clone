import type { Meta, StoryObj } from '@storybook/react';
import { TestingPage } from './Testing';

const meta: Meta<typeof TestingPage> = {
  title: 'Pages/TestingPage',
  component: TestingPage,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof TestingPage>;

export const Default: Story = {
  render: () => <TestingPage />,
};
