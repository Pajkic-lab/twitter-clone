// src/lib/molecules/ProfilePreview/ProfilePreview.test.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { PublicUserBase } from '@tw/data';
import { theme } from '@tw/theme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ProfilePreview } from './ProfilePreview';

// 🧪 mock hooks from data-access
jest.mock('@tw/ui/data-access', () => ({
  usePublicUserSocialStatsQuery: jest.fn().mockReturnValue({
    data: { followersCount: 42, followingCount: 7 },
  }),
  useFollowMutation: jest.fn().mockReturnValue({ mutate: jest.fn(), isPending: false }),
  useUnFollowMutation: jest.fn().mockReturnValue({ mutate: jest.fn(), isPending: false }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

const queryClient = new QueryClient();

const mockUser: PublicUserBase = {
  id: 1,
  email: 'alice@example.com',
  name: 'Alice',
  avatar: 'https://via.placeholder.com/150',
  cover: '',
  uniqueName: '@alice',
  bio: 'Frontend Developer',
  location: 'Earth',
  website: 'https://alice.dev',
  createdAt: new Date(),
  updatedAt: new Date(),
  followingStatus: false,
};

const mockInvData = {
  followIfPublicUser: jest.fn(),
  follow: jest.fn(),
  unFollowIfPublicUser: jest.fn(),
  unFollow: jest.fn(),
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>,
  );
};

describe('ProfilePreview', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders name, handle, and bio', () => {
    renderWithProviders(
      <ProfilePreview
        buttonRelatedUser={mockUser}
        meId={999}
        invData={mockInvData}
        showConnectButton
      />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('@alice')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('shows connect button when showConnectButton is true', () => {
    renderWithProviders(
      <ProfilePreview
        buttonRelatedUser={mockUser}
        meId={999}
        invData={mockInvData}
        showConnectButton
      />,
    );
    expect(screen.queryByRole('button', { name: /Follow/i })).toBeInTheDocument();
  });

  it('hides connect button when showConnectButton is false', () => {
    renderWithProviders(
      <ProfilePreview
        buttonRelatedUser={mockUser}
        meId={999}
        invData={mockInvData}
        showConnectButton={false}
      />,
    );
    expect(screen.queryByRole('button', { name: /Follow/i })).not.toBeInTheDocument();
  });

  it('truncates long text', () => {
    const longUser = { ...mockUser, name: 'A'.repeat(50), bio: 'B'.repeat(50) };
    renderWithProviders(
      <ProfilePreview
        buttonRelatedUser={longUser}
        meId={999}
        invData={mockInvData}
        showConnectButton
      />,
    );
    // Expect text to be truncated with "..."
    expect(screen.getByText(/A{20}.../)).toBeInTheDocument();
    expect(screen.getByText(/B{20}.../)).toBeInTheDocument();
  });

  it('navigates when clicking the profile image', () => {
    renderWithProviders(
      <ProfilePreview
        buttonRelatedUser={mockUser}
        meId={999}
        invData={mockInvData}
        showConnectButton
      />,
    );
    const image = screen.getByTestId('profile-avatar');
    expect(image).toBeInTheDocument();

    fireEvent.click(image);

    expect(mockNavigate).toHaveBeenCalledWith('/public-profile/1');
  });
  it('navigates when clicking the profile name', () => {
    renderWithProviders(
      <ProfilePreview
        buttonRelatedUser={mockUser}
        meId={999}
        invData={mockInvData}
        showConnectButton
      />,
    );
    const nameElement = screen.getByTestId('profile-name');
    expect(nameElement).toBeInTheDocument();

    fireEvent.click(nameElement);

    expect(mockNavigate).toHaveBeenCalledWith('/public-profile/1');
  });
});
