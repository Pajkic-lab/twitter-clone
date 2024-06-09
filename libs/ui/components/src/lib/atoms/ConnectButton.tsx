import { ConnectUser } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from './Button';

type ConnectButtonProps = {
  meId: number;
  buttonRelatedUserId: number;
  publicUserId?: number;
  isConnectPending?: boolean;
  followingStatus: boolean;
  handleUserConnect?: ConnectUser;
};

export const ConnectButton = (props: ConnectButtonProps) => {
  const {
    meId,
    buttonRelatedUserId,
    publicUserId,
    followingStatus,
    isConnectPending,
    handleUserConnect,
  } = props;
  if (buttonRelatedUserId === meId) return;

  const [isConnectButtonHovered, setIsConnectButtonHovered] =
    useState<boolean>(false);

  const handleConnectUser = (e: MouseEvent) => {
    e.stopPropagation();
    handleUserConnect &&
      handleUserConnect(buttonRelatedUserId, followingStatus, publicUserId);
  };

  const handleConnectButtonHover = () => {
    setIsConnectButtonHovered(true);
  };

  const handleConnectButtonHoverLeave = () => {
    setIsConnectButtonHovered(false);
  };

  const btFollowText = isConnectButtonHovered ? 'UnFollow' : 'Following';
  const connectButtonText = followingStatus ? btFollowText : 'Follow';
  const isConnectionButtonLoading = isConnectPending;

  return (
    <Button
      loading={isConnectionButtonLoading}
      $followingStatus={followingStatus}
      onMouseEnter={handleConnectButtonHover}
      onMouseLeave={handleConnectButtonHoverLeave}
      onClick={(e) => handleConnectUser(e)}
    >
      {connectButtonText}
    </Button>
  );
};

const Button = styled(SecondaryButton)<{ $followingStatus: boolean }>`
  height: 2.286rem;
  padding: 0 16px;
  width: 6rem;

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
