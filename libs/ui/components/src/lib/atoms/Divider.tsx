import { colors } from '@tw/ui/assets';
import styled from 'styled-components';

export const Divider = ({ text }: { text: string }) => {
  return (
    <DividerWrapper>
      <DividerLine />
      <H5>{text}</H5>
      <DividerLine />
    </DividerWrapper>
  );
};

const DividerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  margin-bottom: 5px;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 0.2px;
  background-color: ${colors.grayDark};
`;

const H5 = styled.h5`
  font-weight: 500;
  font-size: medium;
  color: ${colors.grayLight};
  padding: 7px;
`;
