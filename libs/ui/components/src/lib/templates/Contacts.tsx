import {
  FollowerListResponseDto,
  PublicUserBase,
  UserResponseDto,
} from '@tw/data';
import styled from 'styled-components';
import { Trends } from '../molecules/Trends';
import { Mediabar } from '../organisms/Mediabar';
import { UserLIst } from '../organisms/UserLIst';
import { UserListLane } from '../organisms/UserListLane';
import { Sidebar } from '../organisms/sidebar/Sidebar';

type ContactsProps = {
  meId: number;
  user: UserResponseDto;
  userList: FollowerListResponseDto[];
  userListLoading: boolean;
  infScrollElRef: (node?: Element | null | undefined) => void;
  hasMoreData: boolean;
  noDataText: string;
  mediaBarUserListTitle: string;
  mostPopularUsers: PublicUserBase[] | undefined; // how to handle undefined and where???
  mostPopularUsersLoading: boolean;
};

export const Contacts = (props: ContactsProps) => {
  const {
    meId,
    user,
    userList,
    userListLoading,
    infScrollElRef,
    hasMoreData,
    noDataText,
    mediaBarUserListTitle,
    mostPopularUsers,
    mostPopularUsersLoading,
  } = props;

  return (
    <Wrapper>
      <Sidebar />

      <UserListLane
        meId={meId}
        user={user}
        userList={userList}
        userListLoading={userListLoading}
        infScrollElRef={infScrollElRef}
        hasMoreData={hasMoreData}
        noDataText={noDataText}
      />

      <Mediabar
        meId={meId}
        topWindowChilde={
          <UserLIst
            meId={meId}
            title={mediaBarUserListTitle}
            users={mostPopularUsers}
            userListLoading={mostPopularUsersLoading}
          />
        }
        bottomWindowChilde={<Trends />}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
