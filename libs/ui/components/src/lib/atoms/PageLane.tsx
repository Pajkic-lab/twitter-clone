import { colors } from '@tw/ui/assets';
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
 * Measures are on purpose in px, because they should be always fixed.
 */
const Wrapper = styled.div<StyleProps>`
  min-height: 100vh;
  width: ${({ width }) => `${width}px`};
  min-width: ${({ width }) => `${width}px`};
  border-left: ${({ hasBorder }) => hasBorder && `2px solid ${colors.grayDark}`};
  border-right: ${({ hasBorder }) => hasBorder && `2px solid ${colors.grayDark}`};
`;
