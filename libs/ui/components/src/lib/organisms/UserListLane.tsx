import { FollowerListResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import styled from 'styled-components';
import { NavigationBar } from '../molecules/NavigationBar';
import { WhoToFollow } from '../molecules/WhoToFollow';

const LANE_WIDTH = 598; // px
const NAVBAR_HEIGHT = 4.286; //rem

type UserListLaneProps = {
  userList: FollowerListResponseDto[] | undefined;
  userListLoading: boolean;
};

export const UserListLane = (props: UserListLaneProps) => {
  const { userList, userListLoading } = props;

  return (
    <Wrapper>
      <NavigationBar name={'nesto'} width={LANE_WIDTH} height={NAVBAR_HEIGHT} />

      <Divider topMargin={NAVBAR_HEIGHT} />

      <WhoToFollow
        mostPopularUsers={userList}
        isMostPopularUsersLoading={userListLoading}
      />
    </Wrapper>
  );
};

/**
 * Positions are causing problems all over, Navbar should be extracted as separate component
 * and should be sticky, same goes for Mediabar.
 */
const Wrapper = styled.div`
  min-height: 100vh;
  width: ${LANE_WIDTH}px;
  min-width: ${LANE_WIDTH}px;
  border-left: 1px solid ${colors.grayDark};
  border-right: 1px solid ${colors.grayDark};
  overflow: hidden !important; // important because some times it does not apply for some reason.
`;

const Divider = styled.div<{ topMargin: number }>`
  margin-top: ${({ topMargin }) => `${topMargin}rem`};
`;
