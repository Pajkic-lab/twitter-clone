import { colors } from '@tw/ui/assets';
import { linksRecords } from '@tw/ui/common';
import { useSignOutMutation } from '@tw/ui/data-access';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Rename this component
export const ExitFormTooltip = ({ uniqueName }: { uniqueName: string }) => {
  const navigate = useNavigate();
  const useSingOut = useSignOutMutation();

  const logOut = async () => {
    const { status } = await useSingOut.mutateAsync();
    if (status === 200) navigate(linksRecords.landingPage);
  };

  return (
    <Wrapper onClick={logOut}>
      <Span>Sign out {uniqueName}</Span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 16rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.4rem;
  box-shadow: 0 0 8px hsla(0, 100%, 99.2156862745098%, 0.738);
  cursor: pointer;
  background-color: ${colors.black};
`;

const Span = styled.span`
  color: ${colors.grayPrimary};
  font-weight: 700;
`;
