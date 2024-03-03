import { SetStateAction } from 'react';
import Sticky from 'react-stickynode';
import { EditProfileModal } from '../components/modals/EditProfileModal';

export const TestingPage = () => {
  return (
    <div style={{ height: '200vh', padding: '20rem' }}>
      <Sticky enabled={true} top={50} bottomBoundary={1200}>
        <button>test</button>
      </Sticky>
      <EditProfileModal
        editProfileModalIsOpen
        setEditProfileModalIsOpen={function (
          value: SetStateAction<boolean>
        ): void {
          throw new Error('Function not implemented.');
        }}
      />
      ;
    </div>
  );
};
