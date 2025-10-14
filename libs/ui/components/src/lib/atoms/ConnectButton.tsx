import { colors } from '@tw/ui/assets';
import { InvalidationData } from '@tw/ui/common';
import { useFollowMutation, useUnFollowMutation } from '@tw/ui/data-access';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from './Button';

type ConnectButtonProps = {
  meId: number;
  buttonRelatedUserId: number;
  publicUserId?: number;
  followingStatus: boolean;
  invData: InvalidationData;
};

export const ConnectButton = (props: ConnectButtonProps) => {
  const { meId, buttonRelatedUserId, publicUserId, followingStatus, invData } = props;
  if (buttonRelatedUserId === meId) return;

  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [followStatus, setFollowStatus] = useState<boolean>(false);

  const { mutateAsync: followMutation } = useFollowMutation();
  const { mutateAsync: unFollowMutation } = useUnFollowMutation();

  const btFollowText = useMemo(() => {
    return isButtonHovered ? 'UnFollow' : 'Following';
  }, [isButtonHovered]);

  const connectButtonText = useMemo(() => {
    return followingStatus ? btFollowText : 'Follow';
  }, [followingStatus, btFollowText]);

  const handleConnectButtonHover = () => {
    setIsButtonHovered(true);
  };

  const handleConnectButtonHoverLeave = () => {
    setIsButtonHovered(false);
  };

  useEffect(() => {
    if (click && followingStatus === followStatus) {
      // ORDER IS IMPORTANT
      setIsButtonLoading(false);
      setClick(false);
    }
  }, [click, followingStatus, followStatus]);

  const handleConnectUser = async (e: MouseEvent) => {
    // ORDER IS IMPORTANT
    e.stopPropagation();
    setIsButtonLoading(true);
    setFollowStatus(!followingStatus);
    setClick(true);

    if (!followingStatus) {
      const { status } = await followMutation({ userId: buttonRelatedUserId });

      if (status) {
        if (publicUserId) {
          invData.followIfPublicUser(publicUserId);
        }
        invData.follow();
      }
      return;
    }

    const { status } = await unFollowMutation({ userId: buttonRelatedUserId });

    if (status) {
      if (publicUserId) {
        invData.unFollowIfPublicUser(publicUserId);
      }
      invData.unFollow();
    }
  };

  return (
    <Button
      loading={isButtonLoading}
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

  color: ${({ $followingStatus }) => ($followingStatus ? colors.black : colors.grayPrimary)};

  background-color: ${({ $followingStatus }) => ($followingStatus ? colors.white : '')};

  &:hover {
    color: ${({ $followingStatus }) => ($followingStatus ? colors.red : colors.white)};
    border: ${({ $followingStatus }) => ($followingStatus ? `1px solid ${colors.red}` : '')};
  }
`;
