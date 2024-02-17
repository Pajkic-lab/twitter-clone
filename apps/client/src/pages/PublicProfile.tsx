import React from 'react';
import styled from 'styled-components';
import { SideBar } from '../components/layout/SideBar';
import { MainLane } from '../components/layout/mainLane';
import { MediaBar } from '../components/layout/mediaBar';
import { PublicProfileTrigger } from '../customHooks/PublicProfileTrigger';

export const PublicProfile: React.FC = () => {
  return (
    <Wrapper>
      <PublicProfileTrigger />
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
