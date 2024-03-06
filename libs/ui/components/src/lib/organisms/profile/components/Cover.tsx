import { Colors } from '@tw/ui/assets';
import styled from 'styled-components';

type CoverProps = {
  cover: string;
  topMargin: number;
};

export const Cover = (props: CoverProps) => {
  const { cover, topMargin } = props;

  return <CoverWrapper cover={cover} topMargin={topMargin} />;
};

const CoverWrapper = styled.div<CoverProps>`
  width: 100%;
  height: 200px;
  margin-top: ${({ topMargin }) => `${topMargin}rem`};
  background-image: ${({ cover }) => cover && `url(${cover})`};
  background-color: ${Colors.grayDark};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
