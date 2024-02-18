import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SideBar } from '../components/layout/SideBar';
import { MainLane } from '../components/layout/mainLane';
import { MediaBar } from '../components/layout/mediaBar';
import { SetAccountModal } from '../components/modals/SetAccountModal';

export const Home = () => {
  return (
    <Wrapper>
      {/*  */}
      <Link to={'/home-page'}>
        <button>home page</button>
      </Link>
      {/*  */}
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
