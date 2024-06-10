import { SocialStatsResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { linksRecords } from '@tw/ui/common';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

type SocialStatsProps = {
  socialStats: SocialStatsResponseDto | undefined;
  socialStatsUserId?: number;
};

export const SocialStats = (props: SocialStatsProps) => {
  const { socialStats, socialStatsUserId } = props;

  const params = useParams();
  const navigate = useNavigate();

  const userId = (socialStatsUserId || params?.userId)?.toString();

  const { followersCount = '', followingCount = '' } = socialStats ?? {};

  const navigateToFollowers = () => {
    if (userId) {
      navigate(linksRecords.publicProfilePage.followersById(userId));
    } else {
      navigate(linksRecords.profilePage.followers);
    }
  };

  const navigateToFollowing = () => {
    if (userId) {
      navigate(linksRecords.publicProfilePage.followingById(userId));
    } else {
      navigate(linksRecords.profilePage.following);
    }
  };

  return (
    <SocialStatsWrapper>
      <FollowingStatsWrapper onClick={navigateToFollowing}>
        <StatsNumberSpan>{followingCount}</StatsNumberSpan>
        <StatsTextSpan>Following</StatsTextSpan>
      </FollowingStatsWrapper>
      <FollowersStatsWrapper onClick={navigateToFollowers}>
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
  color: ${colors.grayPrimary};
  font-weight: 700;
  padding-right: 0.3rem;
`;

const StatsTextSpan = styled.span`
  color: ${colors.graySecondary};
  padding-right: 1rem;
`;
