import { PublicUserBase } from '@tw/data';
import { render, screen } from '@tw/test-utils';
import { ProfilePreview } from '@tw/ui/components';

jest.mock('@tw/ui/data-access', () => ({
  usePublicUserSocialStatsQuery: jest.fn().mockReturnValue({
    data: { followersCount: 42, followingCount: 7 },
  }),
  useFollowMutation: jest.fn().mockReturnValue({ mutate: jest.fn(), isPending: false }),
  useUnFollowMutation: jest.fn().mockReturnValue({ mutate: jest.fn(), isPending: false }),
}));

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

describe('ProfilePreview', () => {
  it('should render the name, handle, and bio', () => {
    render(
      <ProfilePreview displayedUser={mockUser} meId={999} invData={{} as any} showConnectButton />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('@alice')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('should show the connect button when showConnectButton is true', () => {
    render(
      <ProfilePreview displayedUser={mockUser} meId={999} invData={{} as any} showConnectButton />,
    );
    expect(screen.queryByRole('button', { name: /Follow/i })).toBeInTheDocument();
  });

  it('should hide the connect button when showConnectButton is false', () => {
    render(
      <ProfilePreview
        displayedUser={mockUser}
        meId={999}
        invData={{} as any}
        showConnectButton={false}
      />,
    );
    expect(screen.queryByRole('button', { name: /Follow/i })).not.toBeInTheDocument();
  });
});
