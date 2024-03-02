import { Colors } from '@tw/ui/assets';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type SideBarNavigationButtonProps = {
  IconBase: React.ComponentType<any>;
  IconActive: React.ComponentType<any>;
  isActive: boolean;
  text: string;
  path: string;
  collapsed: boolean;
};

export const SideBarNavigationButton = (
  props: SideBarNavigationButtonProps
) => {
  const { IconBase, IconActive, isActive, text, path, collapsed } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Wrapper onClick={handleClick}>
      {isActive && <IconActiveStyled as={IconActive} />}
      {!isActive && <IconBaseStyled as={IconBase} />}
      {!collapsed && <Span isActive={isActive}>{text}</Span>}
    </Wrapper>
  );
};

const IconBaseStyled = styled((props) => <props.IconBase {...props} />)`
  fill: ${Colors.grayPrimary};
  height: 2rem;
`;

const IconActiveStyled = styled((props) => <props.IconActive {...props} />)`
  fill: ${Colors.white};
  height: 2rem;
`;

const Span = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? Colors.white : Colors.grayPrimary)};
  font-weight: 600;
  font-size: large;
  padding-left: 1.3rem;
`;

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5rem;
  padding: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.grayDarkActive};
  }
`;
