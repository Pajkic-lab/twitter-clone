import { UserResponseDto } from '@tw/data';
import { Colors, TwitterIcon } from '@tw/ui/assets';
import {
  Mediabar,
  Modal,
  PageLane,
  SetAccountForm,
  Sidebar,
  Testiranje,
  UniqueNameFormData,
} from '@tw/ui/components';
import {
  useCheckUniqueUserNameMutation,
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
  const { collapsed } = useSidebarState();

  const useUser = useUserQuery();
  const checkUniqueUserName = useCheckUniqueUserNameMutation();
  const updateUniqueUserName = useUpdateUniqueUserNameMutation();

  const user = useUser.data ?? ({} as UserResponseDto);
  const { name, avatar, uniqueName } = user;

  const { isNameUnique } = checkUniqueUserName.data ?? {};

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

  return (
    <PageWrapper>
      <Sidebar
        name={name}
        avatar={avatar}
        uniqueName={uniqueName}
        currentPage={location.pathname}
        collapsed={collapsed}
      />

      <PageLane width={598} hasBorder>
        <Testiranje />
      </PageLane>

      <PageLane width={380}>
        <Mediabar />
      </PageLane>

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
  position: 'relative';
`;

const TwLogo = styled(TwitterIcon)`
  fill: ${Colors.grayLight};
  width: 2.5rem;
  height: 2.5rem;
`;
