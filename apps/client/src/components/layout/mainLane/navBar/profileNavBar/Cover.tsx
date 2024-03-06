import { colors } from '@tw/ui/assets';
import React from 'react';
import styled from 'styled-components';

export const Cover: React.FC<{ cover: string }> = ({ cover }) => {
  return <CoverWrapper $backgroundImage={cover} />;
};

const CoverWrapper = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 200px;
  background-color: ${colors.grayDark};
  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;
