import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { http } from '../../http/api';

export const publicUserSocialStatsQueryKey = (userId: any) => {
  return ['publicUser', 'socialStats', userId];
};

export const publicUserFollowingStatsQueryKey = (userId: any) => {
  return ['publicUser', 'followingStatus', userId];
};

export const publicProfileFollowersKey = (userId: any) => {
  return ['publicUser', 'followers', userId];
};

export const publicProfileFollowingKey = (userId: any) => {
  return ['publicUser', 'following', userId];
};

export const usePublicUserSocialStatsQuery = (userId: number) => {
  return useQuery({
    queryKey: publicUserSocialStatsQueryKey(userId),
    queryFn: async () => {
      const res = await http.social.getPublicUserSocialStats(userId);
      return res.data.payload;
    },
  });
};

export const usePublicUserFollowingStatusQuery = (userId: number) => {
  return useQuery({
    queryKey: publicUserFollowingStatsQueryKey(userId),
    queryFn: async () => {
      const res = await http.social.getPublicUserFollowingStatus(userId);
      return res.data.payload;
    },
  });
};

export const usePublicProfileFollowersInfQuery = (
  userId: number,
  limit: number
) => {
  return useInfiniteQuery({
    queryKey: publicProfileFollowersKey(userId),
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const res = await http.social.getPublicProfileFollowers({
        PPfollowerOffset: pageParam,
        PPfollowerLimit: limit,
        userId,
      });
      return res.data.payload;
    },
    getNextPageParam: (lastGroup, allGroups) => {
      return lastGroup.length === limit ? allGroups.length * limit : undefined;
    },
  });
};

export const usePublicProfileFollowingInfQuery = (
  userId: number,
  limit: number
) => {
  return useInfiniteQuery({
    queryKey: publicProfileFollowingKey(userId),
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const res = await http.social.getPublicProfileFollowingUsers({
        PPfollowingOffset: pageParam,
        PPfollowingLimit: limit,
        userId,
      });
      return res.data.payload;
    },
    getNextPageParam: (lastGroup, allGroups) => {
      return lastGroup.length === limit ? allGroups.length * limit : undefined;
    },
    refetchOnWindowFocus: 'always',
  });
};
