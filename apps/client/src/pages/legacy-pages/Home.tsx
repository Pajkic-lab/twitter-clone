import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SideBar } from '../../components/layout/SideBar';
import { MainLane } from '../../components/layout/mainLane';
import { MediaBar } from '../../components/layout/mediaBar';
// import { SetAccountModal } from '../components/modals/SetAccountModal';
// import { Colors, TwitterLogo } from '@tw/ui/assets';
// import { Modal } from '@tw/ui/components';
// import { v4 as uuid } from 'uuid';
import { SetAccountModal } from '../../components/modals/SetAccountModal';
import { pages } from '../../router/pages';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {/*  */}

      <button onClick={() => navigate(pages.homePage.path)}>home page</button>

      {/*  */}
      <SetAccountModal />
      {/* <Modal
        actionsContentAlinement="center"
        modalIsOpen
        setModalIsOpen={() => undefined}
        actions={[<TwLogo key={uuid()} />]}
        children={<input />}
      /> */}
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

// const TwLogo = styled(TwitterLogo)`
//   fill: ${Colors.grayLight};
//   width: 2.5rem;
//   height: 2.5rem;
// `;
