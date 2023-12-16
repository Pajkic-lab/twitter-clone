import styled, { keyframes } from 'styled-components';
import { FunctionComponent } from 'react';
import { Colors } from './styles';

interface Props {
  fullScreen?: boolean;
}
export const Loader: FunctionComponent<Props> = ({ fullScreen, ...props }) => {
  return fullScreen ? (
    <Wrapper>
      <Element data-element="loader" {...props} />
    </Wrapper>
  ) : (
    <Element data-element="loader" {...props} />
  );
};

const loaderKeyframe = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${Colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Element = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  font-size: 10px;
  position: relative;
  border: 4px solid transparent;
  border-left-color: ${Colors.primary};
  transform: translateZ(0);
  animation: ${loaderKeyframe} 1.1s infinite linear;

  ::after {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
`;
