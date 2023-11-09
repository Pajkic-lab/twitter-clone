import styled from 'styled-components';
import React from 'react';
import { SetAccountModal } from '../components/modals/SetAccountModal';
import { SideBar } from '../components/layout/SideBar';
import { MainLane } from '../components/layout/mainLane';
import { MediaBar } from '../components/layout/mediaBar';

export const Home: React.FC = () => {
  return (
    <Wrapper>
      <SetAccountModal />
      <SideBar />
      <MainLane />
      <MediaBar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;
