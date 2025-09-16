import { colors } from '@tw/ui/assets';
import styled from 'styled-components';

// could Mainlane component be used here, is there a need for this component?
export const HomeMainLane = () => {
  return (
    <Wrapper>
      <TabWrapper>
        <Tab>
          <Text $active>For you</Text>
        </Tab>
        <Tab>
          <Text>Following</Text>
        </Tab>
      </TabWrapper>

      <NotificationWrapper>
        <Title>Posts coming soon!</Title>
        <Description>Feature in development...</Description>
      </NotificationWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  width: 598px;
  min-width: 598px;
  border-left: 1px solid ${colors.grayDark};
  border-right: 1px solid ${colors.grayDark};
`;

const TabWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  border-bottom: 1px solid ${colors.grayDark};
`;

const Tab = styled.div`
  width: 100%;
  height: 3.786rem;
  display: flex;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
`;

const Text = styled.div<{ $active?: boolean }>`
  padding: 0.8rem 0;
  color: ${colors.graySecondary};
  font-weight: 600;
  font-size: medium;

  ${(props) =>
    props.$active &&
    `
    border-bottom: 4px solid ${colors.bluePrimary};
    color: ${colors.grayPrimary};
    font-weight: 800;
  `}
`;

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: ${colors.white};
  font-weight: 700;
  padding-left: 1rem;
  margin: 10rem 0 0 0;
`;

const Description = styled.h3`
  color: ${colors.graySecondary};
  padding-left: 1rem;
  margin: 1rem 0;
`;
