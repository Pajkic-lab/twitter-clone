import { Meta, StoryObj } from '@storybook/react';
import { PublicUserBase } from '@tw/data';
import { ProfilePreview } from '@tw/ui/components';

function createMockUser(overrides: Partial<PublicUserBase> = {}): PublicUserBase {
  return {
    id: '1',
    followingStatus: false,
    email: 'mock@example.com',
    name: 'Mock User',
    avatar: 'https://via.placeholder.com/100',
    cover: '',
    uniqueName: '@mockuser',
    bio: 'Frontend Developer',
    location: 'NYC',
    website: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

const meta: Meta<typeof ProfilePreview> = {
  title: 'Molecules/ProfilePreview',
  component: ProfilePreview,

  decorators: [(Story) => <Story />],
  argTypes: {},
  args: {
    displayedUser: createMockUser(),
    meId: '999',
  },
};
export default meta;

type Story = StoryObj<typeof ProfilePreview>;

export const Default: Story = {};

export const NoConnectButton: Story = {
  args: {
    displayedUser: createMockUser({ followingStatus: false }),
  },
};

export const LongText: Story = {
  args: {
    displayedUser: createMockUser({
      name: 'A'.repeat(50),
      bio: 'B'.repeat(50),
      uniqueName: '@verylongusername',
    }),
    meId: '999',
  },
};
