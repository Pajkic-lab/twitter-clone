import { UserResponseDto } from '@tw/data';
import { colors, TwitterIcon } from '@tw/ui/assets';
import {
  HomeMainLane,
  Mediabar,
  Modal,
  SetAccountForm,
  Sidebar,
  Trends,
  UniqueNameFormData,
  WhoToFollow,
} from '@tw/ui/components';
import {
  useCheckUniqueUserNameMutation,
  useMediabarState,
  useMostPopularUsersQuery,
  useSearchUserMutation,
  useSidebarState,
  useUpdateUniqueUserNameMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

/* WIP */
export const HomePage = () => {
  const location = useLocation();
  const { sidebarCollapsed } = useSidebarState();
  const { mediabarSize } = useMediabarState();

  const useUser = useUserQuery();
  const checkUniqueUserName = useCheckUniqueUserNameMutation();
  const updateUniqueUserName = useUpdateUniqueUserNameMutation();
  const useSearchUser = useSearchUserMutation();
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const user = useUser.data ?? ({} as UserResponseDto);
  const { name, avatar, uniqueName } = user;

  const { isNameUnique } = checkUniqueUserName.data ?? {};
  const { data: searchUserRes, isPending: searchIsLoading } = useSearchUser;

  // unique name logic
  const onSubmitUniqueName = useCallback(
    (uniqueNameFormData: UniqueNameFormData) => {
      updateUniqueUserName.mutate(uniqueNameFormData);
    },
    [updateUniqueUserName]
  );

  const onChangeUniqueName = useCallback(
    (uniqueName: string) => {
      checkUniqueUserName.mutate({ uniqueName });
    },
    [checkUniqueUserName]
  );

  const userHasNoUniqueName = useMemo(
    () => !uniqueName && !useUser.isFetching,
    [uniqueName, useUser.isFetching]
  );

  const isNameUniqueServerResponse = useMemo(
    () => !!isNameUnique,
    [isNameUnique]
  );

  // search logic
  const searchInputOnChange = useCallback(
    async (searchData: string) => {
      if (!searchData) {
        return useSearchUser.reset();
      }
      useSearchUser.mutate({ searchData });
    },
    [useSearchUser]
  );

  return (
    <PageWrapper>
      <Sidebar
        name={name}
        avatar={avatar}
        uniqueName={uniqueName}
        currentPage={location.pathname}
        collapsed={sidebarCollapsed}
      />

      <HomeMainLane />

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

      <Modal
        setModalIsOpen={() => undefined}
        modalIsOpen={userHasNoUniqueName}
        actionsContentAlinement={'center'}
        actions={[<TwLogo key={uuid()} />]}
      >
        <SetAccountForm
          onSubmit={onSubmitUniqueName}
          onChange={onChangeUniqueName}
          isNameUnique={isNameUniqueServerResponse}
          isFormSubmitting={updateUniqueUserName.isPending}
          isUniqueNameChecking={checkUniqueUserName.isPending}
        />
      </Modal>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TwLogo = styled(TwitterIcon)`
  fill: ${colors.grayLight};
  width: 2.5rem;
  height: 2.5rem;
`;
