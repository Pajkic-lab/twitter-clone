import { Colors } from '@tw/ui/assets';
import STICKY from 'react-stickynode';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { SearchBar } from '../molecules/SearchBar';

/**
 * Flicker is do to library 'react-stickynode'
 */

export const Mediabar = () => {
  return (
    <Wrapper>
      <SearchInputWrapper>
        <SearchBar InputId={uuid()} />
      </SearchInputWrapper>
      <StickyContainer>
        <Test />
        <Test1 />
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In maxime
          exercitationem error perferendis asperiores, autem, animi accusantium
          architecto, sequi ullam voluptatem assumenda iusto! Qui, maxime fugit
          consequatur veniam error aspernatur.
        </span>
      </StickyContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const StickyContainer = styled(STICKY)`
  color: white;
`;

const SearchInputWrapper = styled.div`
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
`;

const Test1 = styled.div`
  background-color: ${Colors.grayDark};
  height: 800px;
  width: 100%;
  border-radius: 2rem;
`;
