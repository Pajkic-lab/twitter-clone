import {
  ConnectUser,
  FollowerListResponseDto,
  UserResponseDto,
} from '@tw/data';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Mediabar } from '../organisms/Mediabar';
import { UserListLane } from '../organisms/UserListLane';
import { Sidebar } from '../organisms/sidebar/Sidebar';

type ContactsProps = {
  user: UserResponseDto;
  pubLicUser?: UserResponseDto;
  userList: FollowerListResponseDto[];
  userListLoading: boolean;
  showBio?: boolean;
  showConnectButton?: boolean;
  showUserPreview?: boolean;
  infScrollElRef: (node?: Element | null | undefined) => void;
  hasMoreData: boolean;
  noDataText: string;
  handleUserConnect: ConnectUser;
  isConnectPending?: number[];
  topWindowChilde: ReactNode;
  bottomWindowChilde: ReactNode;
};

export const Contacts = (props: ContactsProps) => {
  const {
    user,
    pubLicUser,
    userList,
    userListLoading,
    showBio,
    showConnectButton,
    showUserPreview,
    infScrollElRef,
    hasMoreData,
    noDataText,
    handleUserConnect,
    isConnectPending,
    topWindowChilde,
    bottomWindowChilde,
  } = props;

  const { id: meId, name, uniqueName, avatar } = user;
  const currentUser = pubLicUser ?? user;

  return (
    <Wrapper>
      <Sidebar name={name} uniqueName={uniqueName} avatar={avatar} />

      <UserListLane
        meId={meId}
        publicUser={currentUser}
        userList={userList}
        showBio={showBio}
        showConnectButton={showConnectButton}
        showUserPreview={showUserPreview}
        userListLoading={userListLoading}
        infScrollElRef={infScrollElRef}
        hasMoreData={hasMoreData}
        noDataText={noDataText}
        handleUserConnect={handleUserConnect}
        isConnectPending={isConnectPending}
      />

      <Mediabar
        meId={meId}
        topWindowChilde={topWindowChilde}
        bottomWindowChilde={bottomWindowChilde}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
