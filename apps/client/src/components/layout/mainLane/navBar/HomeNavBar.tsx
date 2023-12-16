import { Colors } from 'apps/client/src/ui/styles';
import { useState } from 'react';
import styled from 'styled-components';

export const HomeNavBar = () => {
  const [selected, setSelected] = useState({
    forYou: true,
    following: false,
  });
  const { forYou, following } = selected;

  return (
    <Wrapper>
      <H2>Home</H2>
      <NavigationWrapper>
        <Navigation
          onClick={() => setSelected({ forYou: true, following: false })}
        >
          <Span $active={forYou}>For you</Span>
        </Navigation>
        <Navigation
          onClick={() => setSelected({ forYou: false, following: true })}
        >
          <Span $active={following}>Following</Span>
        </Navigation>
      </NavigationWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  border-bottom: 2px solid ${Colors.darkerGrey};
  backdrop-filter: blur(10px);
`;

const H2 = styled.h2`
  margin: 0;
  padding: 0.8rem 1rem 0.8rem 1rem;
  font-weight: 700;
  color: ${Colors.textGray};
`;

const NavigationWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

const Navigation = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blackActive};
  }
`;

const Span = styled.div<{ $active: boolean }>`
  padding: 0.8rem 0;
  color: ${Colors.darkGray};
  font-weight: 600;

  ${(props) =>
    props.$active &&
    `
    border-bottom: 5px solid ${Colors.primary};
    color: ${Colors.textGray};
    font-weight: 800;
  `}
`;
