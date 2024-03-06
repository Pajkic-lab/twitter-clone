import { SocialStatsResponseDto } from '@tw/data';
import { Colors } from '@tw/ui/assets';
import styled from 'styled-components';

type SocialStatsProps = {
  id: number | undefined;
  socialStats: SocialStatsResponseDto | undefined;
};

export const SocialStats = (props: SocialStatsProps) => {
  const { id, socialStats } = props;

  const { followersCount = '', followingCount = '' } = socialStats ?? {};

  return (
    <SocialStatsWrapper>
      <FollowingStatsWrapper>
        <StatsNumberSpan>{followingCount}</StatsNumberSpan>
        <StatsTextSpan>Following</StatsTextSpan>
      </FollowingStatsWrapper>
      <FollowersStatsWrapper>
        <StatsNumberSpan>{followersCount}</StatsNumberSpan>
        <StatsTextSpan>Followers</StatsTextSpan>
      </FollowersStatsWrapper>
    </SocialStatsWrapper>
  );
};

const SocialStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding-bottom: 1rem;
`;

const FollowingStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`;

const FollowersStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`;

const StatsNumberSpan = styled.span`
  color: ${Colors.grayPrimary};
  font-weight: 700;
  padding-right: 0.3rem;
`;

const StatsTextSpan = styled.span`
  color: ${Colors.graySecondary};
  padding-right: 1rem;
`;
