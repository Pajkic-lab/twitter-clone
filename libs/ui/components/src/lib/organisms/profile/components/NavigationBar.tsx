import { ArrowLeftIcon, Colors } from '@tw/ui/assets';
import styled from 'styled-components';
type NavigationBarProps = {
  name: string;
  width: number;
  height: number;
};

type NavigationBarStyleProps = Pick<NavigationBarProps, 'width' | 'height'>;

export const NavigationBar = (props: NavigationBarProps) => {
  const { name, width, height } = props;

  return (
    <Container width={width} height={height}>
      <Wrapper>
        <SVGWrapper>
          <ArrowLogo />
        </SVGWrapper>
        <TittleWrapper>
          <H3>{name}</H3>
          <SpanHeader>number of tweets</SpanHeader>
        </TittleWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<NavigationBarStyleProps>`
  width: ${({ width }) =>
    `${width}px`}; // px because it defines value that will never change
  height: ${({ height }) =>
    `${height}rem`}; // rem because it defines value that could change
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  text-align: start;
  justify-content: start;
  backdrop-filter: blur(10px);
`;

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.3rem;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.grayDarkActive};
  }
`;

const ArrowLogo = styled(ArrowLeftIcon)`
  fill: ${Colors.grayPrimary};
  width: 1.5rem;
  height: 1.5rem;
`;

const TittleWrapper = styled.div`
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

const H3 = styled.h3`
  margin: 0;
  font-weight: 700;
  color: ${Colors.grayPrimary};
`;

const SpanHeader = styled.span`
  color: ${Colors.graySecondary};
`;
