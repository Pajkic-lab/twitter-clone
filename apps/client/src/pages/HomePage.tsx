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
  UserLIst,
} from '@tw/ui/components';
import {
  useCheckUniqueUserNameMutation,
  useMostPopularUsersQuery,
  useUpdateUniqueUserNameMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export const HomePage = () => {
  const { data: user, isPending: userIsLoading } = useUserQuery();
  const { data: mostPopularUsers, isFetching: isMostPopularUsersLoading } =
    useMostPopularUsersQuery();

  const {
    data: uniqueUserName,
    mutate: checkUniqueUserNameMutate,
    isPending: checkUniqueNameLoading,
  } = useCheckUniqueUserNameMutation();

  const {
    mutate: updateUniqueUserNameMutate,
    isPending: updateUniqueUserNameLoading,
  } = useUpdateUniqueUserNameMutation();

  const { id, name, uniqueName, avatar } = user ?? ({} as UserResponseDto);
  const { isNameUnique } = uniqueUserName ?? {};

  const onSubmitUniqueName = useCallback(
    (uniqueNameFormData: UniqueNameFormData) => {
      updateUniqueUserNameMutate(uniqueNameFormData);
    },
    [updateUniqueUserNameMutate]
  );

  const onChangeUniqueName = useCallback(
    (uniqueName: string) => {
      checkUniqueUserNameMutate({ uniqueName });
    },
    [checkUniqueUserNameMutate]
  );

  const userHasNoUniqueName = useMemo(
    () => !uniqueName && !userIsLoading,
    [uniqueName, userIsLoading]
  );

  const isNameUniqueServerResponse = useMemo(
    () => !!isNameUnique,
    [isNameUnique]
  );

  return (
    <PageWrapper>
      <Sidebar name={name} uniqueName={uniqueName} avatar={avatar} />

      <HomeMainLane />

      <Mediabar
        meId={id}
        topWindowChilde={
          <UserLIst
            meId={id}
            title={'You might like'}
            userList={mostPopularUsers}
            userListLoading={isMostPopularUsersLoading}
            showBio={false}
          />
        }
        bottomWindowChilde={<Trends />}
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
          isFormSubmitting={updateUniqueUserNameLoading}
          isUniqueNameChecking={checkUniqueNameLoading}
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
