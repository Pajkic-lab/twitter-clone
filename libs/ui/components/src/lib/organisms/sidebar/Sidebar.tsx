import Tippy from '@tippyjs/react';
import { Colors, FeatherIcon, TwitterIcon } from '@tw/ui/assets';
import { linksRecords } from '@tw/ui/common';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../atoms/Button';
import { ExitFormTooltip } from '../../atoms/ExitFormTooltip';
import { SideBarNavigationButton } from '../../atoms/SideBarNavigationButton';
import { SideBarOptionsButton } from '../../atoms/SideBarOptionsButton';
import { sidebarData } from './sidebar-data';

type SidebarProps = {
  avatar: string | undefined;
  name: string | undefined;
  uniqueName: string | undefined;
  currentPage: string;
  collapsed: boolean;
};

type SidebarStyleProps = Pick<SidebarProps, 'collapsed'>;

const SIDEBAR_WIDTH_FULL = '17.857rem';
const SIDEBAR_WIDTH_COLLAPSED = '6rem';

export const Sidebar = (props: SidebarProps) => {
  const {
    name = '',
    uniqueName = '',
    avatar = '',
    currentPage,
    collapsed,
  } = props;

  const navigate = useNavigate();

  const [sidebarOptionsOpen, setSidebarOptionsOpen] = useState<boolean>(false);

  const handleTooltip = () => {
    setSidebarOptionsOpen(!sidebarOptionsOpen);
  };

  const handleLogoClick = () => {
    navigate(linksRecords.homePage);
  };

  return (
    <Wrapper collapsed={collapsed}>
      <ButtonWrapper collapsed={collapsed}>
        <IconWrapper collapsed={collapsed} onClick={handleLogoClick}>
          <TwLogo />
        </IconWrapper>

        {sidebarData.map((e, i) => (
          <SideBarNavigationButton
            key={i}
            path={e.path}
            text={e.text}
            IconBase={e.ComponentBase}
            IconActive={e.ComponentActive}
            isActive={e.path === currentPage}
            collapsed={collapsed}
          />
        ))}

        <PostButton collapsed={JSON.stringify(collapsed)}>
          {collapsed ? <FeatherIcon /> : 'Post'}
        </PostButton>

        <Tippy
          interactive
          visible={sidebarOptionsOpen}
          onClickOutside={handleTooltip}
          content={<ExitFormTooltip uniqueName={uniqueName} />}
        >
          <TIPYCONTAINER collapsed={collapsed} onClick={handleTooltip}>
            <SideBarOptionsButton
              name={name}
              avatar={avatar}
              uniqueName={uniqueName}
              collapsed={collapsed}
            />
          </TIPYCONTAINER>
        </Tippy>
      </ButtonWrapper>
    </Wrapper>
  );
};

/**
 * This div is here to define position and size in reference to its parent element
 */
const Wrapper = styled.div<SidebarStyleProps>`
  min-width: ${({ collapsed }) =>
    collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_FULL};
  margin-right: ${({ collapsed }) => (collapsed ? '0' : '2rem')};
`;

/**
 * This div is here to enable fix position nad size for containing elements
 */
const ButtonWrapper = styled.div<SidebarStyleProps>`
  width: ${({ collapsed }) =>
    collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_FULL};
  position: fixed;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: ${({ collapsed }) => (collapsed ? 'center' : 'start')};
  gap: 0.6rem;
`;

const IconWrapper = styled.div<SidebarStyleProps>`
  display: flex;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'start')};
  padding: 0.8rem;
  border-radius: 5rem;

  &:hover {
    background-color: ${Colors.grayDarkActive};
  }
`;

const TwLogo = styled(TwitterIcon)`
  fill: ${Colors.grayPrimary};
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
`;

/**
 * Had to stringify boolean value, for some reason trows error when plane boolean.
 */
const PostButton = styled(PrimaryButton)<{ collapsed: string }>`
  width: ${({ collapsed }) =>
    collapsed === 'true' ? '3.5rem' : SIDEBAR_WIDTH_FULL};
  height: 3.5rem;
  font-size: large;
  margin-top: 1rem;
`;

/**
 * Tippy has problems.
 * What I had to do in order for it to work:
 * You can not wrap component with it, it must be div element.
 * I had to extract wrapping div element from SideBarOptionsButton
 * and to place it in Sidebar component in order to adjust tooltip position.
 */
const TIPYCONTAINER = styled.div<SidebarStyleProps>`
  width: ${({ collapsed }) => (collapsed ? '4.5rem' : '100%')};
  position: absolute;
  bottom: 1rem;
`;
