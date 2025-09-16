import { SocialStatsResponseDto, UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Profile } from './profile/Profile';

type MainLaneProps = {
  user: UserResponseDto;
  socialStats: SocialStatsResponseDto | undefined;
  profileActions: ReactNode;
  profileModal?: ReactNode;
};

const LANE_WIDTH = 598; // px

// What is purpose of this component? to wrap one other component????
export const MainLane = (props: MainLaneProps) => {
  const { user, socialStats, profileActions, profileModal } = props;

  return (
    <Wrapper>
      {/* <NavigationBar title={name} text={uniqueName} width={width} height={4.286} /> */}
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
  border-left: 1px solid ${colors.grayDark};
  border-right: 1px solid ${colors.grayDark};
`;
