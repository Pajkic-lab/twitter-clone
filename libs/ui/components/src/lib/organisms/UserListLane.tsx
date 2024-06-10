import {
  ConnectUser,
  FollowerListResponseDto,
  UserResponseDto,
} from '@tw/data';
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
  meId: number;
  publicUser: UserResponseDto;
  userList: FollowerListResponseDto[];
  userListLoading: boolean;
  showBio?: boolean;
  showConnectButton?: boolean;
  showUserPreview?: boolean;
  infScrollElRef: (node?: Element | null | undefined) => void;
  hasMoreData: boolean;
  noDataText: string;
  handleUserConnect?: ConnectUser;
  isConnectPending?: number[];
};

export const UserListLane = (props: UserListLaneProps) => {
  const {
    meId,
    publicUser: { id: publicUserId, name, uniqueName },
    userList,
    showBio,
    showConnectButton,
    showUserPreview,
    userListLoading,
    infScrollElRef,
    hasMoreData,
    noDataText,
    handleUserConnect,
    isConnectPending,
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
        meId={meId}
        publicUserId={publicUserId}
        userList={userList}
        userListLoading={userListLoading}
        showBio={showBio}
        showConnectButton={showConnectButton}
        showUserPreview={showUserPreview}
        scrollable
        infScrollElRef={infScrollElRef}
        hasMoreData={hasMoreData}
        noDataText={noDataText}
        handleUserConnect={handleUserConnect}
        isConnectPending={isConnectPending}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden !important; // important because some times it does not apply for some reason.
  min-height: 100vh;
  width: ${LANE_WIDTH}px;
  min-width: ${LANE_WIDTH}px;
  border-left: 1px solid ${colors.grayDark};
  border-right: 1px solid ${colors.grayDark};
`;

const Divider = styled.div<{ topMargin: number }>`
  margin-top: ${({ topMargin }) => `${topMargin}rem`};
`;
