import { colors } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '../../../atoms/Button';

type AvatarAndOptionsProps = {
  avatar: string;
  profileActions: ReactNode;
  profileModal?: ReactNode;
};

// Avatar should be component for it self, where ese are we using this component? should we use it in every avatar place???
export const AvatarAndOptions = (props: AvatarAndOptionsProps) => {
  const { avatar, profileActions, profileModal } = props;

  return (
    <ProfileImageWrapper>
      <ImageWrapper avatar={avatar} />
      <ActionsWrapper>{profileActions}</ActionsWrapper>
      <>{profileModal}</>
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

const ImageWrapper = styled.div<{ avatar: string }>`
  position: absolute;
  top: -5rem;
  left: 1rem;
  width: 10rem;
  height: 10rem;
  border: 4px solid ${colors.black};
  border-radius: 50%;
  background-image: ${({ avatar }) => avatar && `url(${avatar})`};
  background-color: ${colors.grayDark};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ActionsWrapper = styled.div`
  display: flex;
`;

const EditProfileButton = styled(SecondaryButton)`
  color: ${colors.grayPrimary};
  padding-left: 0;
  padding-right: 0;
`;

const FollowButton = styled(SecondaryButton)`
  color: ${colors.black};
  background-color: ${colors.white};
  padding-left: 0;
  padding-right: 0;

  &:hover {
    color: ${colors.white};
  }
`;
const UnFollowButton = styled(SecondaryButton)`
  color: ${colors.grayPrimary};
  padding-left: 0;
  padding-right: 0;

  &:hover {
    color: ${colors.red};
    border: 1px solid ${colors.red};
  }
`;
