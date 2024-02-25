import styled from 'styled-components';
import { SideBar } from '../components/layout/SideBar';
import { MainLane } from '../components/layout/mainLane';
import { MediaBar } from '../components/layout/mediaBar';
import { ConnectionsTrigger } from '../customHooks/ConnectionsTrigger';

export const ContactList = () => {
  return (
    <Wrapper>
      <ConnectionsTrigger />
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
