import { FollowerListResponseDto, UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import styled from 'styled-components';
import { NavigationBar } from '../molecules/NavigationBar';
import { UserLIst } from './UserLIst';

/**
 * Positions are causing problems all over, Navbar should be extracted as separate component
 * and should be sticky, same goes for Mediabar.
 */
const LANE_WIDTH = 598; // px
const NAVBAR_HEIGHT = 4.286; //rem

type UserListLaneProps = {
  user: UserResponseDto;
  userList: FollowerListResponseDto[];
  userListLoading: boolean;
  infScrollElRef?: (node?: Element | null | undefined) => void;
};

export const UserListLane = (props: UserListLaneProps) => {
  const {
    user: { name, uniqueName },
    userList,
    userListLoading,
    infScrollElRef,
  } = props;

  return (
    <Wrapper>
      <NavigationBar
        title={name}
        text={uniqueName}
        width={LANE_WIDTH}
        height={NAVBAR_HEIGHT}
      />

      <Divider topMargin={NAVBAR_HEIGHT} />

      <UserLIst
        users={userList}
        userListLoading={userListLoading}
        infScrollElRef={infScrollElRef}
      />
    </Wrapper>
  );
};

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
