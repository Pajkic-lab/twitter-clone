import { Colors, TwitterLogo } from '@tw/ui/assets';
import { Modal, SetAccountForm, UniqueNameFormData } from '@tw/ui/components';
import {
  useCheckUniqueUserNameMutation,
  useUpdateUniqueUserNameMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export const HomePage = () => {
  // following code is about setting account(uniqueName)
  const user = useUserQuery();

  const checkUniqueUserName = useCheckUniqueUserNameMutation();
  const updateUniqueUserName = useUpdateUniqueUserNameMutation();

  const [isValid, setIsValid] = useState<boolean>(false);

  const noUniqueName =
    !user.data?.data.payload.user.uniqueName && !user.isFetching;
  const isCheckingNameAvailability = checkUniqueUserName.isPending || !isValid;

  const onSubmitUniqueName = (uniqueNameFormData: UniqueNameFormData) => {
    updateUniqueUserName.mutate(uniqueNameFormData);
  };

  const onChangeUniqueName = (uniqueName: string | undefined) => {
    if (uniqueName && isValid) {
      checkUniqueUserName.mutate({ uniqueName });
    }
  };

  return (
    <>
      <Modal
        modalIsOpen={noUniqueName}
        setModalIsOpen={() => undefined}
        actions={[<TwLogo key={uuid()} />]}
        actionsContentAlinement="center"
      >
        <SetAccountForm
          onSubmit={onSubmitUniqueName}
          onChange={onChangeUniqueName}
          isPending={updateUniqueUserName.isPending}
          disabled={isCheckingNameAvailability}
          setIsValid={setIsValid}
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
