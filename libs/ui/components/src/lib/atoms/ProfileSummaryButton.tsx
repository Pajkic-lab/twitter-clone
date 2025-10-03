import { colors } from '@tw/ui/assets';
import React from 'react';
import styled from 'styled-components';
import { SecondaryButton } from './Button';

type ProfileSummaryButtonProps = {
  onClick?: () => void;
};

export const ProfileSummaryButton: React.FC<ProfileSummaryButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <strong>Profile Summary</strong>
    </Button>
  );
};

const Button = styled(SecondaryButton)`
  width: 100%;
  height: 2.286rem;
  padding: 12px 16px;

  color: ${colors.white};
  background-color: ${colors.black};
  font-weight: 400;
  cursor: pointer;
  font-size: 15px;
  border: 0.5px solid ${colors.graySecondary} !important;

  &:hover {
    background-color: ${colors.grayDark};
  }
`;
