import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PublicUserBase } from '@tw/data';
import { theme } from '@tw/theme';
import { InvalidationData } from '@tw/ui/common';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ProfilePreview } from './ProfilePreview';

const queryClient = new QueryClient();

// Mock user data
const mockUser: PublicUserBase = {
  followingStatus: false,
  id: 1,
  email: 'alice@example.com',
  name: 'Alice',
  avatar: 'https://via.placeholder.com/100',
  cover: '',
  uniqueName: '@alice',
  bio: 'Frontend Developer',
  location: 'NYC',
  website: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
const mockUser2: PublicUserBase = {
  followingStatus: false,
  id: 2,
  email: 'alice@example.com',
  name: 'Aliceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  avatar: 'https://via.placeholder.com/100',
  cover: '',
  uniqueName: '@alice2',
  bio: 'Frontend Developerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
  location: 'NYC',
  website: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock invalidation data
const mockInvData: InvalidationData = {
  followIfPublicUser: (id: number) => console.log('followIfPublicUser', id),
  follow: () => console.log('follow'),
  unFollowIfPublicUser: (id: number) => console.log('unFollowIfPublicUser', id),
  unFollow: () => console.log('unFollow'),
};

const meta: Meta<typeof ProfilePreview> = {
  title: 'Molecules/ProfilePreview',
  component: ProfilePreview,

  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProfilePreview>;

export const Default: Story = {
  args: {
    buttonRelatedUser: mockUser,
    meId: 999,
    invData: mockInvData,
    showConnectButton: true,
  },
};

export const NoConnectButton: Story = {
  args: {
    buttonRelatedUser: mockUser,
    meId: 999,
    invData: mockInvData,
    showConnectButton: false,
  },
};

export const LongText: Story = {
  args: {
    buttonRelatedUser: mockUser2,
    meId: 999,
    invData: mockInvData,
    showConnectButton: false,
  },
};
