import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { FollowUserRequestDto, UnFollowUserRequestDto } from '@tw/data';
import { http } from '../../http/api';
import { QueryAction, useResetQuery } from '../resetQuery';

export const socialStatsQueryKey = 'socialStatsQueryKey';

export const publicUserSocialStatsQueryKey = [
  'publicUser',
  'publicUserSocialStatsQueryKey',
];

export const publicUserSFollowingStatsQueryKey = [
  'publicUser',
  'publicUserSFollowingStatsQueryKey',
];

export const userGetFollowersKey = ['query', 'userGetFollowersKey'];

export const userGetFollowingKey = ['query', 'userGetFollowingKey'];

export const socialGetPublicProfileFollowersKey =
  'socialGetPublicProfileFollowersKey';

export const socialGetPublicProfileFollowingKey =
  'socialGetPublicProfileFollowingKey';

export const useSocialStatsQuery = () => {
  return useQuery({
    queryKey: [socialStatsQueryKey],
    queryFn: async () => {
      const res = await http.social.getSocialStats();
      return res.data.payload;
    },
  });
};

//
export const usePublicUserSocialStatsQuery = (userId: number) => {
  return useQuery({
    queryKey: [publicUserSocialStatsQueryKey],
    queryFn: async () => {
      const res = await http.social.getPublicUserSocialStats(userId);
      return res.data.payload;
    },
  });
};
//
export const usePublicUserFollowingStatusQuery = (userId: number) => {
  return useQuery({
    queryKey: [publicUserSFollowingStatsQueryKey],
    queryFn: async () => {
      const res = await http.social.getPublicUserFollowingStatus(userId);
      return res.data.payload;
    },
  });
};

//
export const useFollowersInfQuery = (limit: number) => {
  return useInfiniteQuery({
    queryKey: [userGetFollowersKey],
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
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useFollowingInfQuery = (limit: number) => {
  return useInfiniteQuery({
    queryKey: [userGetFollowingKey],
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
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const usePublicProfileFollowersInfQuery = (
  userId: number,
  limit: number
) => {
  return useInfiniteQuery({
    queryKey: [socialGetPublicProfileFollowersKey],
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
    queryKey: [socialGetPublicProfileFollowingKey],
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
  });
};

export const useFollowMutation = () => {
  return useMutation({
    mutationFn: async (userId: FollowUserRequestDto) => {
      return await http.social.followUser(userId);
    },
    onSuccess: () => {
      useResetQuery(QueryAction.Invalidate, publicUserSocialStatsQueryKey);
      useResetQuery(QueryAction.Invalidate, publicUserSFollowingStatsQueryKey);
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey);
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey);
    },
    onError: (error) => {},
  });
};

export const useUnFollowMutation = () => {
  return useMutation({
    mutationFn: async (userId: UnFollowUserRequestDto) => {
      return await http.social.unFollowUser(userId);
    },
    onSuccess: () => {
      useResetQuery(QueryAction.Invalidate, publicUserSocialStatsQueryKey);
      useResetQuery(QueryAction.Invalidate, publicUserSFollowingStatsQueryKey);
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey);
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey);
    },
    onError: (error) => {},
  });
};
