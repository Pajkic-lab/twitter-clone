import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { http } from '../../http/api';

export const socialQueryKey = 'socialQueryKey';
export const socialGetFollowersKey = 'socialGetFollowersKey';
export const socialGetFollowingKey = 'socialGetFollowingKey';
export const socialGetPublicProfileFollowersKey =
  'socialGetPublicProfileFollowersKey';
export const socialGetPublicProfileFollowingKey =
  'socialGetPublicProfileFollowingKey';

export const useSocialQuery = () => {
  return useQuery({
    queryKey: [socialQueryKey],
    queryFn: async () => {
      const res = await http.social.getSocialStats();
      return res.data.payload;
    },
  });
};

export const useFollowersInfQuery = (limit: number) => {
  return useInfiniteQuery({
    queryKey: [socialGetFollowersKey],
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
    queryKey: [socialGetFollowingKey],
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
