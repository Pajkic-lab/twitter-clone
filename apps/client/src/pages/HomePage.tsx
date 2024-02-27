import { Colors, TwitterLogo } from '@tw/ui/assets';
import { Modal, SetAccountForm, UniqueNameFormData } from '@tw/ui/components';
import {
  useCheckUniqueUserNameMutation,
  useUpdateUniqueUserNameMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export const HomePage = () => {
  const updateUniqueUserName = useUpdateUniqueUserNameMutation();
  const checkUniqueUserName = useCheckUniqueUserNameMutation();
  const user = useUserQuery();

  const userHasNoUniqueName =
    !user.data?.data.payload.uniqueName && !user.isFetching;
  const isNameUniqueServerResponse =
    !!checkUniqueUserName.data?.data.payload.isNameUnique;

  const onSubmitUniqueName = (uniqueNameFormData: UniqueNameFormData) => {
    updateUniqueUserName.mutate(uniqueNameFormData);
  };

  const onChangeUniqueName = (uniqueName: string) => {
    checkUniqueUserName.mutate({ uniqueName });
  };

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
