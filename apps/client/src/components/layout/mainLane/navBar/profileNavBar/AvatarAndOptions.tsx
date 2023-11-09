import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'apps/client/src/store/hooks';
import {
  followUserThunk,
  unFollowUserThunk,
} from 'apps/client/src/store/features/authSlice/thunk';
import { EditProfileModal } from 'apps/client/src/components/modals/EditProfileModal';
import { Colors } from 'apps/client/src/ui/styles';
import { SecondaryButton } from 'apps/client/src/ui/Button';

export const AvatarAndOptions: React.FC<{
  avatar: string;
  pathname: string;
}> = ({ avatar, pathname }) => {
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);
  const params = useParams();
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector((state) => state.auth);
  const { followingStatus, followIsSubmitting } = useAppSelector(
    (state) => state.publicProfile
  );

  const followUserHelper = () => {
    if (params.id) {
      void dispatch(followUserThunk(parseInt(params.id)));
    }
  };
  const unFollowUserHelper = () => {
    if (params.id) {
      void dispatch(unFollowUserThunk(parseInt(params.id)));
    }
  };

  const ButtonOptons: React.FC = () => {
    return (
      <>
        {followingStatus ? (
          <UnFolloweButton
            onClick={() => unFollowUserHelper()}
            loading={followIsSubmitting}
          >
            UnFollow
          </UnFolloweButton>
        ) : (
          <FolloweButton
            onClick={() => followUserHelper()}
            loading={followIsSubmitting}
          >
            Follow
          </FolloweButton>
        )}
      </>
    );
  };

  return (
    <ProfileImageWrapper>
      <ImageWrapper $backgroundImage={avatar} />
      {pathname === '/profile' && (
        <>
          <EditProfileButton onClick={() => setEditProfileModalIsOpen(true)}>
            Edit profile
          </EditProfileButton>
          <EditProfileModal
            editProfileModalIsOpen={editProfileModalIsOpen}
            setEditProfileModalIsOpen={setEditProfileModalIsOpen}
          />
        </>
      )}
      {pathname !== '/profile' && isAuth && <ButtonOptons />}
      {pathname !== '/profile' && !isAuth && null}
    </ProfileImageWrapper>
  );
};

const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  padding: 0.8rem 1rem;
  height: 85px;
`;

const ImageWrapper = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  top: -5rem;
  left: 1rem;
  width: 10rem;
  height: 10rem;
  border: 4px solid ${Colors.black};
  border-radius: 50%;
  background-color: ${Colors.darkerGrey};
  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const EditProfileButton = styled(SecondaryButton)`
  color: ${Colors.textGray};
  padding-left: 0;
  padding-right: 0;
`;

const FolloweButton = styled(SecondaryButton)`
  color: ${Colors.black};
  background-color: ${Colors.white};
  padding-left: 0;
  padding-right: 0;

  &:hover {
    color: ${Colors.white};
  }
`;
const UnFolloweButton = styled(SecondaryButton)`
  color: ${Colors.textGray};
  padding-left: 0;
  padding-right: 0;

  &:hover {
    color: ${Colors.red};
    border: 1px solid ${Colors.red};
  }
`;
