import { Colors, TwitterIcon } from '@tw/ui/assets';
import {
  Modal,
  PageLane,
  PrimaryButton,
  SetAccountForm,
  Sidebar,
  SignUpForm,
  UniqueNameFormData,
} from '@tw/ui/components';
import {
  useCheckUniqueUserNameMutation,
  useUpdateUniqueUserNameMutation,
  useUserQuery,
} from '@tw/ui/data-access';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { SideBar as Nesto } from '../components/layout/SideBar';

/* WIP */
export const HomePage = () => {
  // refactor the way you are recovering data from hooks.
  const location = useLocation();

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

  const avatar = user.data?.data.payload.avatar;
  const name = user.data?.data.payload.name || '';
  const uniqueName = user.data?.data.payload.uniqueName || '';

  return (
    <PageWrapper>
      <Modal
        setModalIsOpen={() => undefined}
        modalIsOpen={userHasNoUniqueName}
        actionsContentAlinement="center"
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

      {/* left lane */}
      <PageLane width={300}>
        <Sidebar
          avatar={avatar}
          name={name}
          uniqueName={uniqueName}
          currentPage={location.pathname}
        />
      </PageLane>

      {/* central lane */}
      <PageLane hasBorder width={598}>
        <Bt>nesto</Bt>
        <SignUpForm
          onSubmit={function (signUpFormData: {
            email: string;
            password: string;
            username: string;
            confirmPassword: string;
          }): void {
            throw new Error('Function not implemented.');
          }}
          isPending={false}
        />
      </PageLane>

      {/* right lane */}
      <PageLane width={400}>
        {/* <MediaBar /> */}
        <Nesto />
      </PageLane>
    </PageWrapper>
  );
};

//
const Bt = styled(PrimaryButton)`
  position: fixed;
  width: 598px;
  top: 0;
  z-index: 10;
`;
//

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
