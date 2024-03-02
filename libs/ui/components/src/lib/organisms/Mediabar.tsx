import { SearchUsersResponseDto } from '@tw/data';
import { Colors } from '@tw/ui/assets';
import { BreakpointKeys, Breakpoints } from '@tw/ui/common';
import Sticky from 'react-stickynode';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { SearchInput } from '../molecules/SearchInput';

type MediabarProps = {
  mediabarSize: BreakpointKeys;
  searchInputOnChange: (val: string) => void;
  searchUserRes: SearchUsersResponseDto[] | undefined;
  searchIsLoading: boolean;
};

const sizeTable: Breakpoints = {
  s: 0,
  m: 0,
  l: 18,
  xl: 21.75,
  '2xl': 0,
  '3xl': 0,
};

/**
 * Flicker is do to library 'react-stickynode'
 */
export const Mediabar = (props: MediabarProps) => {
  const { mediabarSize, searchInputOnChange, searchUserRes, searchIsLoading } =
    props;

  return (
    <Wrapper size={mediabarSize}>
      <SearchInputWrapper>
        <SearchInput
          id={uuid()}
          size={mediabarSize}
          sizeTable={sizeTable}
          searchInputOnChange={searchInputOnChange}
          searchUserRes={searchUserRes}
          searchIsLoading={searchIsLoading}
        />
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

const Wrapper = styled.div<{ size: BreakpointKeys }>`
  width: ${({ size }) => `${sizeTable[size]}rem`};
  margin-left: 2rem;
`;

const StickyContainer = styled(Sticky)`
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
  margin-top: 6rem;
  margin-bottom: 2rem;
  border-radius: 2rem;
`;

const Test1 = styled.div`
  background-color: ${Colors.grayDark};
  height: 800px;
  width: 100%;
  border-radius: 2rem;
`;
