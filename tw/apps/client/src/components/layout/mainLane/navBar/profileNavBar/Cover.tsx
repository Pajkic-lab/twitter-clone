import styled from 'styled-components';
import React from 'react';
import { Colors } from 'apps/client/src/ui/styles';

export const Cover: React.FC<{ cover: string }> = ({ cover }) => {
  return <CoverWrapper $backgroundImage={cover} />;
};

const CoverWrapper = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 200px;
  background-color: ${Colors.darkerGrey};
  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;