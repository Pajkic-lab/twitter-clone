import { useCallback, useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

type TabsProps = {
  tabs: {
    tabName: string;
    content: React.ReactNode;
  }[];
  defaultTab?: number;
};

type TabProps = {
  text: string;
  active?: boolean;
  onClick?: () => void;
};

type StyledTabProps = {
  $active?: boolean;
};

type UnderlineProps = {
  $width: number;
};

export function Tabs(tabGroupProps: TabsProps) {
  const { tabs, defaultTab } = tabGroupProps;

  const [activeTab, setActiveTab] = useState<string>(tabs[defaultTab || 0]!.tabName);
  const activeContent = useMemo(
    () => tabs.find((tab) => tab.tabName === activeTab)?.content,
    [tabs, activeTab],
  );

  const activateTab = useCallback((tabName: string) => setActiveTab(tabName), []);
  const isActive = useCallback((tabName: string) => activeTab === tabName, [activeTab]);

  return (
    <TabGroupWrapper>
      <TabsWrapper>
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            text={tab.tabName}
            active={isActive(tab.tabName)}
            onClick={() => activateTab(tab.tabName)}
          />
        ))}
      </TabsWrapper>
      <TabPanel>{activeContent}</TabPanel>
    </TabGroupWrapper>
  );
}

function Tab(props: TabProps) {
  const { text, active = false, onClick } = props;
  const [textWidth, setTextWidth] = useState<number>(0);

  useEffect(() => {
    if (active) {
      const width = getRenderedTextWidth(text);
      setTextWidth(width);
    }
  }, [active, text]);

  return (
    <StyledTab $active={active} onClick={onClick}>
      <Text>{text}</Text>
      {active && <Underline $width={textWidth} data-testid="underline" />}
    </StyledTab>
  );
}

function getRenderedTextWidth(text: string, className?: string): number {
  const span = document.createElement('span');
  span.style.visibility = 'hidden';
  span.style.whiteSpace = 'nowrap';
  if (className) span.className = className;
  span.textContent = text;

  document.body.appendChild(span);
  const width = span.offsetWidth;
  document.body.removeChild(span);

  return width * 1.15;
}

const TabGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 0.2px solid ${({ theme }) => theme.colors.gray};
`;

const StyledTab = styled.button<StyledTabProps>(
  ({ theme, $active }) => css`
    height: 53px;
    width: 100%;
    padding: 0 16px;
    font-size: ${theme.typography.fontSizes.md};
    font-family: ${theme.typography.fontFamily};
    font-weight: ${theme.typography.fontWeight.semiBold};
    background-color: ${theme.colors.black};
    color: ${theme.colors.gray};
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover {
      background-color: ${theme.colors.black1};
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    ${$active &&
    css`
      color: ${theme.colors.white};
    `}
  `,
);

const Text = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Underline = styled.div<UnderlineProps>(
  ({ theme, $width }) => css`
    height: 4px;
    border-radius: ${theme.radii.md};
    width: ${$width}px;
    background-color: ${theme.colors.royalBlue};
    margin-top: auto;
  `,
);

const TabPanel = styled.div`
  width: 100%;
`;
