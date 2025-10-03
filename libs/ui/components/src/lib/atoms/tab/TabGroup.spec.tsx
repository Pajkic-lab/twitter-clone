import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { theme } from '@tw/theme';
import { ThemeProvider } from 'styled-components';
import { TabGroup } from './TabGroup';

const tabs = [
  { tabName: 'Tab 1', content: <div>Tab 1 content</div> },
  { tabName: 'Tab 2', content: <div>Tab 2 content</div> },
];

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('TabGroup', () => {
  it('should render tabs successfully', () => {
    renderWithTheme(<TabGroup tabs={tabs} />);

    const renderedTabs = screen.getAllByRole('button');
    expect(renderedTabs).toHaveLength(tabs.length);
  });

  it('should render tab panel successfully', () => {
    renderWithTheme(<TabGroup tabs={tabs} />);

    const tabPanel = screen.getByText('Tab 1 content');
    expect(tabPanel).toBeInTheDocument();
  });

  it('should render active tab', () => {
    renderWithTheme(<TabGroup tabs={tabs} />);

    const underline = screen.getByTestId('underline');
    expect(underline).toBeInTheDocument();
  });

  it('moves underline to second tab after clicking', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TabGroup tabs={tabs} />);

    const secondTab = screen.getByRole('button', { name: 'Tab 2' });

    await user.click(secondTab);

    const underline = await screen.findByTestId('underline');

    expect(underline).toBeInTheDocument();

    expect(screen.getByText('Tab 2 content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 1 content')).not.toBeInTheDocument();
  });
});
