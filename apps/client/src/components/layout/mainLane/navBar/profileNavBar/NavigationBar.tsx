import { Colors } from '@tw/ui/assets';
import { resetState, useAppDispatch } from '@tw/ui/data-access';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '../../../../../assets/svg/arrowLeft.svg';

export const NavigationBar: React.FC<{ name: string }> = ({ name }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nvigateBack = () => {
    dispatch(resetState());
    navigate(-1);
  };

  return (
    <HeaderWrapper>
      <SVGWrapper onClick={() => nvigateBack()}>
        <ArrowLogo />
      </SVGWrapper>
      <TittleWrapper>
        <H3>{name}</H3>
        <SpanHeader>number of tweets</SpanHeader>
      </TittleWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  text-align: start;
  justify-content: start;
`;

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.3rem;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.grayDarkActive};
  }
`;

const ArrowLogo = styled(ArrowLeft)`
  fill: ${Colors.grayPrimary};
  width: 1.5rem;
  height: 1.5rem;
`;

const TittleWrapper = styled.div`
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

const H3 = styled.h3`
  margin: 0;
  font-weight: 700;
  color: ${Colors.grayPrimary};
`;

const SpanHeader = styled.span`
  color: ${Colors.graySecondary};
`;
