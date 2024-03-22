import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { FollowUserRequestDto, UnFollowUserRequestDto } from '@tw/data';
import { http } from '../../http/api';

export const socialStatsQueryKey = ['userSocialStats'];

export const userGetFollowersKey = () => {
  return ['userFollowers'];
};

export const userGetFollowingKey = () => {
  return ['userFollowing'];
};

export const useSocialStatsQuery = () => {
  return useQuery({
    queryKey: socialStatsQueryKey,
    queryFn: async () => {
      const res = await http.social.getSocialStats();
      return res.data.payload;
    },
  });
};

export const useFollowMutation = () => {
  return useMutation({
    mutationFn: async (userId: FollowUserRequestDto) => {
      return await http.social.followUser(userId);
    },
    onSuccess: () => {},
    onError: (error) => {},
  });
};

export const useUnFollowMutation = () => {
  return useMutation({
    mutationFn: async (userId: UnFollowUserRequestDto) => {
      return await http.social.unFollowUser(userId);
    },
    onSuccess: () => {},
    onError: (error) => {},
  });
};

export const useFollowersInfQuery = (limit: number) => {
  return useInfiniteQuery({
    queryKey: userGetFollowersKey(),
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const res = await http.social.getFollowers({
        followerOffset: pageParam,
        followerLimit: limit,
      });
      return res.data.payload;
    },
    getNextPageParam: (lastGroup, allGroups) => {
      return lastGroup.length === limit ? allGroups.length * limit : undefined;
    },
  });
};

export const useFollowingInfQuery = (limit: number) => {
  return useInfiniteQuery({
    queryKey: userGetFollowingKey(),
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const res = await http.social.getFollowingUsers({
        followingOffset: pageParam,
        followingLimit: limit,
      });
      return res.data.payload;
    },
    getNextPageParam: (lastGroup, allGroups) => {
      return lastGroup.length === limit ? allGroups.length * limit : undefined;
    },
  });
};
