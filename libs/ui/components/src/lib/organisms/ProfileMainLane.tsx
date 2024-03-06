import { SocialStatsResponseDto, UserResponseDto } from '@tw/data';
import { Colors } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Profile } from './profile/Profile';

type ProfileMainLaneProps = {
  user: UserResponseDto;
  socialStats: SocialStatsResponseDto | undefined;
  profileActions: ReactNode;
  profileModal?: ReactNode;
};

const LANE_WIDTH = 598; // px

export const ProfileMainLane = (props: ProfileMainLaneProps) => {
  const { user, socialStats, profileActions, profileModal } = props;

  return (
    <Wrapper>
      <Profile
        width={LANE_WIDTH}
        user={user}
        socialStats={socialStats}
        profileActions={profileActions}
        profileModal={profileModal}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  width: ${LANE_WIDTH}px;
  min-width: ${LANE_WIDTH}px;
  border-left: 1px solid ${Colors.grayDark};
  border-right: 1px solid ${Colors.grayDark};
`;
