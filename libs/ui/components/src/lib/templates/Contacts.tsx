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
  user: UserResponseDto;
  pubLicUser?: UserResponseDto;
  userList: FollowerListResponseDto[];
  userListLoading: boolean;
  infScrollElRef: (node?: Element | null | undefined) => void;
  hasMoreData: boolean;
  noDataText: string;
  mediaBarUserListTitle: string;
  mostPopularUsers: PublicUserBase[] | undefined;
  mostPopularUsersLoading: boolean;
};

export const Contacts = (props: ContactsProps) => {
  const {
    user,
    pubLicUser,
    userList,
    userListLoading,
    infScrollElRef,
    hasMoreData,
    noDataText,
    mediaBarUserListTitle,
    mostPopularUsers,
    mostPopularUsersLoading,
  } = props;

  const { id: meId, name, uniqueName, avatar } = user;
  const userForLane = pubLicUser ?? user;

  return (
    <Wrapper>
      <Sidebar name={name} uniqueName={uniqueName} avatar={avatar} />

      <UserListLane
        meId={meId}
        user={userForLane}
        userList={userList}
        userListLoading={userListLoading}
        infScrollElRef={infScrollElRef}
        hasMoreData={hasMoreData}
        noDataText={noDataText}
      />

      <Mediabar
        meId={meId}
        // should come from props!
        topWindowChilde={
          <UserLIst
            meId={meId}
            title={mediaBarUserListTitle}
            userList={mostPopularUsers}
            userListLoading={mostPopularUsersLoading}
          />
        }
        // should come from props!
        bottomWindowChilde={<Trends />}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
