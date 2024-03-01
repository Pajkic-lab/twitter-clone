import { Colors } from '@tw/ui/assets';
import Sticky from 'react-stickynode';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { SearchBar } from '../molecules/SearchBar';

/**
 * Flicker is do to library 'react-stickynode'
 */

export const Mediabar = () => {
  return (
    <Wrapper>
      <Nesto>
        <SearchBar InputId={uuid()} />
      </Nesto>
      <Sticky>
        <Test />
        <Test1 />
      </Sticky>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Nesto = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Test = styled.div`
  background-color: ${Colors.grayDark};
  height: 300px;
  width: 100%;
  margin-top: 4rem;
  margin-bottom: 2rem;
  border-radius: 2rem;
  /* z-index: 1; */
`;

const Test1 = styled.div`
  background-color: ${Colors.grayDark};
  height: 800px;
  width: 100%;
  border-radius: 2rem;
  margin-bottom: 10rem;
`;
