import styled from 'styled-components';
import React from 'react';
import { PublicProfileConnectiosTrigger } from '../customHooks/PublicProfileConnectiosTrigger';
import { SideBar } from '../components/layout/SideBar';
import { MainLane } from '../components/layout/mainLane';
import { MediaBar } from '../components/layout/mediaBar';

export const PublicProfileContactList: React.FC = () => {
  return (
    <Wrapper>
      <PublicProfileConnectiosTrigger />
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