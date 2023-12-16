import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from 'apps/client/src/ui/styles';

export const SocialStats = ({
  followersCount,
  followingCount,
  id,
  uniqueName,
  pathname,
}: {
  followersCount: number;
  followingCount: number;
  id: number | null;
  uniqueName: string;
  pathname: string;
}) => {
  const navigate = useNavigate();

  return (
    <SocialStatsWrapper>
      <FollowingStatsWrapper
        // eslint-disable-next-line no-confusing-arrow
        onClick={() =>
          pathname === '/profile'
            ? navigate('/profile/social/following')
            : // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              navigate(`/user/${id!}/social/following`)
        }
      >
        <StatsNumberSpan>{followingCount}</StatsNumberSpan>
        <StatsTextSpan>Following</StatsTextSpan>
      </FollowingStatsWrapper>
      <FollowersStatsWrapper
        // eslint-disable-next-line no-confusing-arrow
        onClick={() =>
          pathname === '/profile'
            ? navigate('/profile/social/followers')
            : // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              navigate(`/user/${id!}/social/followers`)
        }
      >
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
  color: ${Colors.textGray};
  font-weight: 700;
  padding-right: 0.3rem;
`;

const StatsTextSpan = styled.span`
  color: ${Colors.darkGray};
  padding-right: 1rem;
`;
