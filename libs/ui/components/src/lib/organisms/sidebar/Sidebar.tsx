import Tippy from '@tippyjs/react';
import { Colors, TwitterIcon } from '@tw/ui/assets';
import { useState } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../atoms/Button';
import { ExitFormTooltip } from '../../atoms/ExitFormTooltip';
import { SideBarNavigationButton } from '../../atoms/SideBarNavigationButton';
import { SideBarOptionsButton } from '../../atoms/SideBarOptionsButton';
import { sidebarData } from './sidebar-data';

type SidebarProps = {
  avatar: string | undefined;
  name: string;
  uniqueName: string;
  currentPage: string;
};

/**
 * Tippy has problems.
 * What i had to do in order for it to work:
 * You can not wrap component with it, it must be div element.
 * I had to extract wrapping div element from SideBarOptionsButton and to place it in Sidebar component in order to adjust tooltip position.
 */

/* WiP */
export const Sidebar = (props: SidebarProps) => {
  const { avatar = '', name, uniqueName, currentPage } = props;

  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const handleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const handleLogoClick = () => {
    //
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
            IconActive={e.ComponentActive}
            IconBase={e.ComponentBase}
            isActive={e.path === currentPage}
            path={e.path}
            text={e.text}
          />
        ))}
      </ButtonsWrapper>

      <PostButton>Post</PostButton>

      <Tippy
        content={<ExitFormTooltip uniqueName={uniqueName} />}
        visible={tooltipVisible}
        interactive={true}
        onClickOutside={handleTooltip}
      >
        <TIPYCONTAINER onClick={handleTooltip}>
          <SideBarOptionsButton
            avatar={avatar}
            name={name}
            uniqueName={uniqueName}
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
  width: 17rem;
  font-size: large;
`;

// all of this properties should be moved to SideBarOptionsButton wrapping div, only position should remain.
const TIPYCONTAINER = styled.div`
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem 0 1rem;
  border-radius: 5rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.grayDarkActive};
  }
`;
