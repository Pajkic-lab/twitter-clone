import { PublicUserBase } from '@tw/data';
import { render, RenderResult, screen } from '@tw/test-utils';
import { InvalidationData } from '@tw/ui/common';
import { ProfilePreview } from '@tw/ui/components';

const mockUser: PublicUserBase = {
  id: '1',
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

interface SetupOptions {
  displayedUser?: PublicUserBase;
  meId?: string;
}

const setup = (options: SetupOptions = {}): RenderResult => {
  const { displayedUser = mockUser, meId = '999' } = options;

  return render(
    <ProfilePreview displayedUser={displayedUser} meId={meId} invData={{} as InvalidationData} />,
  );
};

describe('ProfilePreview', () => {
  it('should render the component', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  it('should render the name, handle, and bio', () => {
    setup();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('@alice')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('should not show connect button for own profile', () => {
    setup({ meId: '1', displayedUser: { ...mockUser, id: '1' } });
    const connectButton = screen.queryByRole('button', { name: /connect/i });
    expect(connectButton).not.toBeInTheDocument();
  });
});
