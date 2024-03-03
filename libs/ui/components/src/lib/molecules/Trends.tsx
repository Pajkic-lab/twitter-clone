import { Colors } from '@tw/ui/assets';
import styled from 'styled-components';

export const Trends = () => {
  return (
    <ContentWrapper>
      <Title>Trends for you</Title>
      <Description>Feature in development...</Description>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const Title = styled.h2`
  color: ${Colors.white};
  font-weight: 700;
  padding-left: 1rem;
  margin: 1rem 0;
`;

const Description = styled.h3`
  color: ${Colors.graySecondary};
  padding-left: 1rem;
  margin: 1rem 0;
`;
