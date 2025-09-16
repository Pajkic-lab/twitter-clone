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

describe('TabGroup', () => {
  it('should render tabs successfully', () => {
    render(
      <ThemeProvider theme={theme}>
        <TabGroup tabs={tabs} />
      </ThemeProvider>,
    );

    const renderedTabs = screen.getAllByRole('button');
    expect(renderedTabs).toHaveLength(tabs.length);
  });

  it('should render tab panel successfully', () => {
    render(
      <ThemeProvider theme={theme}>
        <TabGroup tabs={tabs} />
      </ThemeProvider>,
    );

    const tabPanel = screen.getByText('Tab 1 content');
    expect(tabPanel).toBeInTheDocument();
  });

  it('should render active tab', () => {
    render(
      <ThemeProvider theme={theme}>
        <TabGroup tabs={tabs} />
      </ThemeProvider>,
    );

    const underline = screen.getByTestId('underline');
    expect(underline).toBeInTheDocument();
  });

  it('should on click activate tab', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <TabGroup tabs={tabs} />
      </ThemeProvider>,
    );

    const secondTab = screen.getByRole('button', { name: 'Tab 2' });
    await user.click(secondTab);

    const underline = screen.getByTestId('underline');
    expect(underline).toBeInTheDocument();
  });
});
