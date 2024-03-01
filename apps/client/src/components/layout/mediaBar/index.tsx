import styled from 'styled-components';
import { SearchBar } from '../../../../../../libs/ui/components/src/lib/molecules/SearchBar';

export const MediaBar = () => {
  return (
    <Wrapper>
      <SearchBar InputId={'serchBarId'} />
      {/* trends for you */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0.5rem 2rem 0 2rem;
  position: fixed;
`;
