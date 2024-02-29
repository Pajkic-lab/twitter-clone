import { Colors } from '@tw/ui/assets';
import styled from 'styled-components';

export const ExitFormTooltip = ({ uniqueName }: { uniqueName: string }) => {
  const logOut = () => {
    //
  };

  return (
    <Wrapper onClick={logOut}>
      <Span>Log out {uniqueName}</Span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 16rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.4rem;
  box-shadow: 0 0 8px hsla(0, 100%, 99.2156862745098%, 0.738);
  cursor: pointer;
`;

const Span = styled.span`
  color: ${Colors.grayPrimary};
  font-weight: 700;
`;
