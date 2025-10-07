import userEvent from '@testing-library/user-event';
import { render, screen } from '@tw/test-utils';
import { Tabs } from './Tabs';

const tabs = [
  { tabName: 'Tab 1', content: <div>Tab 1 content</div> },
  { tabName: 'Tab 2', content: <div>Tab 2 content</div> },
];

describe('Tabs', () => {
  it('should render all tab buttons', () => {
    render(<Tabs tabs={tabs} />);

    const renderedTabs = screen.getAllByRole('button');
    expect(renderedTabs).toHaveLength(tabs.length);
  });

  it('should render first tab content by default', () => {
    render(<Tabs tabs={tabs} />);

    expect(screen.getByText('Tab 1 content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 2 content')).not.toBeInTheDocument();
  });

  it('should show underline on active tab', () => {
    render(<Tabs tabs={tabs} />);

    const underline = screen.getByTestId('underline');
    expect(underline).toBeInTheDocument();
  });

  it('should render specified tab when defaultTab prop is provided', () => {
    render(<Tabs tabs={tabs} defaultTab={1} />);

    expect(screen.queryByText('Tab 1 content')).not.toBeInTheDocument();
    expect(screen.getByText('Tab 2 content')).toBeInTheDocument();
  });

  it('should switch to clicked tab', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);

    expect(screen.getByText('Tab 1 content')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Tab 2' }));

    expect(screen.queryByText('Tab 1 content')).not.toBeInTheDocument();
    expect(screen.getByText('Tab 2 content')).toBeInTheDocument();
  });
});
