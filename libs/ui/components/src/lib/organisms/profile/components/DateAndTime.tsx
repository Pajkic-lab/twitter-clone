import { calenderIcon, colors } from '@tw/ui/assets';
import styled from 'styled-components';

export const DateAndTime = ({ formattedTime }: { formattedTime: string }) => {
  return (
    <DateWrapper>
      <CalenderLogo />
      <SpanBio>Joined {formattedTime}</SpanBio>
    </DateWrapper>
  );
};

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding-bottom: 1rem;
`;

const CalenderLogo = styled(calenderIcon)`
  fill: ${colors.graySecondary};
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.3rem;
`;

const SpanBio = styled.span`
  color: ${colors.graySecondary};
  font-weight: 500;
`;
