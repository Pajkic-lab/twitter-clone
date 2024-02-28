import { Colors } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';

type PageLaneProps = {
  width?: number;
  hasBorder?: boolean;
  children: ReactNode;
};

type StyleProps = Omit<PageLaneProps, 'children'>;

export const PageLane = (props: PageLaneProps) => {
  const { width, hasBorder, children } = props;

  return (
    <Wrapper width={width} hasBorder={hasBorder}>
      {children}
    </Wrapper>
  );
};

/**
 * measures are on purpose in px, because I want them to be fixed
 */
const Wrapper = styled.div<StyleProps>`
  min-height: 100vh;
  width: ${({ width }) => `${width}px`};
  border-left: ${({ hasBorder }) =>
    hasBorder && `2px solid ${Colors.grayDark}`};
  border-right: ${({ hasBorder }) =>
    hasBorder && `2px solid ${Colors.grayDark}`};
`;
