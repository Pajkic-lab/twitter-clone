import Tippy from '@tippyjs/react';
import { Colors, TwitterIcon } from '@tw/ui/assets';
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

/**
 * Tippy has problems.
 * What I had to do in order for it to work:
 * You can not wrap component with it, it must be div element.
 * I had to extract wrapping div element from SideBarOptionsButton and to place it in Sidebar component in order to adjust tooltip position.
 */

/* WiP */
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
    <Wrapper>
      <IconWrapper onClick={handleLogoClick}>
        <TwLogo />
      </IconWrapper>

      <ButtonsWrapper>
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
      </ButtonsWrapper>

      <PostButton>Post</PostButton>

      <Tippy
        interactive
        visible={sidebarOptionsOpen}
        onClickOutside={handleTooltip}
        content={<ExitFormTooltip uniqueName={uniqueName} />}
      >
        <TIPYCONTAINER onClick={handleTooltip} collapsed={collapsed}>
          <SideBarOptionsButton
            name={name}
            avatar={avatar}
            uniqueName={uniqueName}
            collapsed={collapsed}
          />
        </TIPYCONTAINER>
      </Tippy>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  padding-top: 1rem;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  padding: 0 0 1rem 1.5rem;
`;

const TwLogo = styled(TwitterIcon)`
  fill: ${Colors.grayPrimary};
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.7rem;
`;

const PostButton = styled(PrimaryButton)`
  height: 3.5rem;
  margin-top: 1rem;
  font-size: large;
`;

const TIPYCONTAINER = styled.div<{
  collapsed: boolean;
}>`
  position: absolute;
  bottom: 1rem;
  width: ${({ collapsed }) => (collapsed ? '' : `${17}rem`)};
`;
