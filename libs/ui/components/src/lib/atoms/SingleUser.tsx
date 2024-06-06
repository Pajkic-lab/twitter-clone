import { PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { linksRecords } from '@tw/ui/common';
import {
  QueryAction,
  publicProfileFollowersKey,
  useFollowMutation,
  useResetQuery,
  useUnFollowMutation,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SecondaryButton } from './Button';

type SingleUserProps = {
  buttonRelatedUser: PublicUserBase;
  meId: number;
  publicUserId?: number;
  connectButtonExist?: boolean;
};

export const SingleUser = (props: SingleUserProps) => {
  const {
    meId,
    publicUserId,
    buttonRelatedUser: { name, uniqueName, avatar, id, followingStatus },
  } = props;

  const navigate = useNavigate();

  const { mutateAsync: followMutation, isPending: isFollowLoading } =
    useFollowMutation();
  const { mutateAsync: unFollowMutation, isPending: isUnFollowingLoading } =
    useUnFollowMutation();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const goToUserPage = () => {
    if (meId === id) {
      return navigate(linksRecords.profilePage.base);
    }
    navigate(linksRecords.publicProfilePage.baseById(id));
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverExit = () => {
    setIsHovered(false);
  };

  const btFollowText = isHovered ? 'UnFollow' : 'Following';
  const connectButtonText = followingStatus ? btFollowText : 'Follow';
  const isConnectionButtonLoading = isFollowLoading || isUnFollowingLoading;

  const handleConnect = async () => {
    // OK, so where from this button is begin triggered depends what should be invalidated and refatched, so this should be think thru

    // should this logic be in atom it should be outside and based on where is component being invoked than pass adecvat logic?
    if (!followingStatus) {
      const { status } = await followMutation({ userId: id });
      if (status) {
        if (publicUserId) {
          useResetQuery(
            QueryAction.Invalidate,
            publicProfileFollowersKey(publicUserId)
          );
        }

        useResetQuery(QueryAction.Invalidate, userGetFollowersKey()); // do i need to reset followers, it does not touch it
        useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      }
      return;
    }
    const { status } = await unFollowMutation({ userId: id });
    if (status) {
      if (publicUserId) {
        useResetQuery(
          QueryAction.Invalidate,
          publicProfileFollowersKey(publicUserId)
        );
      }

      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
    }
  };

  return (
    <ProfileButtonWrapper>
      <ContextWrapper>
        <ProfileImage $backgroundImage={avatar} onClick={goToUserPage} />
        <TextWrapper>
          <H3>{name}</H3>
          <Span>{uniqueName}</Span>
        </TextWrapper>
      </ContextWrapper>
      <ConnectButton
        loading={isConnectionButtonLoading}
        $followingStatus={followingStatus}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverExit}
        onClick={handleConnect}
      >
        {connectButtonText}
      </ConnectButton>
    </ProfileButtonWrapper>
  );
};

const ProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.8rem 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
`;

const ContextWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>`
  border-radius: 100%;
  width: 3.2rem;
  min-width: 3.2rem;
  height: 3.2rem;
  background-color: ${colors.bluePrimary};

  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${colors.black};
  `}
`;

const TextWrapper = styled.div``;

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.graySecondary};
  font-weight: 500;
`;

const ConnectButton = styled(SecondaryButton)<{ $followingStatus: boolean }>`
  height: 2.286rem;
  padding: 0 16px;
  width: 6rem;
  /* z-index: 50; // this should be handled */

  color: ${({ $followingStatus }) =>
    $followingStatus ? colors.black : colors.grayPrimary};

  background-color: ${({ $followingStatus }) =>
    $followingStatus ? colors.white : ''};

  &:hover {
    color: ${({ $followingStatus }) =>
      $followingStatus ? colors.red : colors.white};
    border: ${({ $followingStatus }) =>
      $followingStatus ? `1px solid ${colors.red}` : ''};
  }
`;
