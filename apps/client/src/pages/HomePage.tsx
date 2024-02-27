import { Colors, TwitterLogo } from '@tw/ui/assets';
import { Modal, SetAccountForm, UniqueNameFormData } from '@tw/ui/components';
import {
  useCheckUniqueUserNameMutation,
  useUpdateUniqueUserNameMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export const HomePage = () => {
  const updateUniqueUserName = useUpdateUniqueUserNameMutation();
  const checkUniqueUserName = useCheckUniqueUserNameMutation();
  const user = useUserQuery();

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
    () => !user.data?.data.payload.uniqueName && !user.isFetching,
    [user.data?.data.payload.uniqueName, user.isFetching]
  );

  const isNameUniqueServerResponse = useMemo(
    () => !!checkUniqueUserName.data?.data.payload.isNameUnique,
    [checkUniqueUserName.data?.data.payload.isNameUnique]
  );

  return (
    <>
      <Modal
        modalIsOpen={userHasNoUniqueName}
        setModalIsOpen={() => undefined}
        actions={[<TwLogo key={uuid()} />]}
        actionsContentAlinement="center"
      >
        <SetAccountForm
          onSubmit={onSubmitUniqueName}
          onChange={onChangeUniqueName}
          isNameUnique={isNameUniqueServerResponse}
          isFormSubmitting={updateUniqueUserName.isPending}
          isUniqueNameChecking={checkUniqueUserName.isPending}
        />
      </Modal>
    </>
  );
};

const TwLogo = styled(TwitterLogo)`
  fill: ${Colors.grayLight};
  width: 2.5rem;
  height: 2.5rem;
`;
