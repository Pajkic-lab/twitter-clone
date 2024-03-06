import { UpdateUserRequestDto, UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import {
  EditProfileForm,
  Mediabar,
  Modal,
  ProfileMainLane,
  SecondaryButton,
  Sidebar,
  Trends,
  WhoToFollow,
} from '@tw/ui/components';
import {
  useMediabarState,
  useMostPopularUsersQuery,
  useSearchUserMutation,
  useSidebarState,
  useSocialQuery,
  useUpdateUserMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export const ProfilePage = () => {
  // all the logic should be moved to organisms, there is no need to have it on every page, same goes for HomePage

  const location = useLocation();
  const { sidebarCollapsed } = useSidebarState();
  const { mediabarSize } = useMediabarState();

  const useUser = useUserQuery();
  const useSearchUser = useSearchUserMutation();
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();
  const { data: socialStats } = useSocialQuery();
  const useUpdateUser = useUpdateUserMutation();

  const [isEditProfileModalOpen, setEditModalProfileOpen] =
    useState<boolean>(false);

  const user = useUser.data ?? ({} as UserResponseDto);
  const { name, avatar, uniqueName } = user;
  const { data: searchUserRes, isPending: searchIsLoading } = useSearchUser;

  const searchInputOnChange = useCallback(
    async (searchData: string) => {
      if (!searchData) {
        return useSearchUser.reset();
      }
      useSearchUser.mutate({ searchData });
    },
    [useSearchUser]
  );

  const openEditProfileModal = () => {
    setEditModalProfileOpen(true);
  };

  //
  const [userFormData, setUserFormData] = useState<UpdateUserRequestDto>({
    avatar: '',
    cover: '',
    name: '',
    bio: '',
    location: '',
    website: '',
  });

  console.log(userFormData);

  const updateUserFormOnSubmit = useCallback(() => {
    useUpdateUser.mutate(userFormData);
  }, [useUpdateUser]);

  //

  return (
    <PageWrapper>
      <Sidebar
        name={name}
        avatar={avatar}
        uniqueName={uniqueName}
        currentPage={location.pathname}
        collapsed={sidebarCollapsed}
      />

      <ProfileMainLane
        user={user}
        socialStats={socialStats}
        profileActions={
          <EditProfileButton onClick={openEditProfileModal}>
            Edit profile
          </EditProfileButton>
        }
        profileModal={
          <Modal
            modalIsOpen={isEditProfileModalOpen}
            setModalIsOpen={setEditModalProfileOpen}
            actionsContentAlinement={'space-between'}
            hasCloseButton
            actionsPositionSticky
            heightFixed
            actions={[
              <Text key={uuid()}>Edit profile</Text>,
              <EditProfileButton
                key={uuid()}
                $width={5}
                // onClick={handleUpdateUserFromChange}
              >
                save
              </EditProfileButton>,
            ]}
            children={<EditProfileForm setUserFormData={setUserFormData} />}
          />
        }
      />

      <Mediabar
        mediabarSize={mediabarSize}
        searchInputOnChange={searchInputOnChange}
        searchUserRes={searchUserRes}
        searchIsLoading={searchIsLoading}
        topWindowChilde={
          <WhoToFollow
            title={'You might like'}
            mostPopularUsers={mostPopularUsers}
            isMostPopularUsersLoading={isMostPopularUsersLoading}
          />
        }
        bottomWindow={<Trends />}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EditProfileButton = styled(SecondaryButton)`
  color: ${colors.grayPrimary};
  height: 2.286rem;
  padding: 0 16px;
`;

const Text = styled.span`
  color: ${colors.grayPrimary};
  font-weight: 700;
  font-size: large;
`;
