import { useAuthQuery } from '@tw/ui/data-access';
import styled from 'styled-components';
import { SideBar } from '../components/layout/SideBar';
import { MainLane } from '../components/layout/mainLane';
import { MediaBar } from '../components/layout/mediaBar';
import { SetAccountModal } from '../components/modals/SetAccountModal';

export const Home = () => {
  // to be removed...
  const auth = useAuthQuery();
  console.log(111, auth);
  //

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
