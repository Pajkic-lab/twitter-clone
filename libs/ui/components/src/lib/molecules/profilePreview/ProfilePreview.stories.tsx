import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PublicUserBase } from '@tw/data';
import { ProfilePreview } from '@tw/ui/components';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

function createMockUser(overrides: Partial<PublicUserBase> = {}): PublicUserBase {
  return {
    id: 1,
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

  decorators: [
    (Story) => (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProfilePreview>;

export const Default: Story = {
  args: {
    displayedUser: createMockUser(),
    meId: 999,
    showConnectButton: true,
  },
};

export const NoConnectButton: Story = {
  args: {
    displayedUser: createMockUser({ followingStatus: false }),
    meId: 999,
    showConnectButton: false,
  },
};

export const LongText: Story = {
  args: {
    displayedUser: createMockUser({
      name: 'A'.repeat(50),
      bio: 'B'.repeat(50),
      uniqueName: '@verylongusername',
    }),
    meId: 999,
    showConnectButton: false,
  },
};
