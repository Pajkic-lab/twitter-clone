import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { FollowUserRequestDto, UnFollowUserRequestDto } from '@tw/data';
import { http } from '../../http/api';
import { publicProfileQueryKey } from '../public-profile';
import { QueryAction, useResetQuery } from '../resetQuery';

export const socialQueryKey = 'socialQueryKey'; // rename this
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

// Follow unFollow
export const useFollowMutation = () => {
  return useMutation({
    mutationFn: async (userId: FollowUserRequestDto) => {
      return await http.social.followUser(userId);
    },
    onSuccess: () => {
      // useResetQuery(QueryAction.Remove, publicProfileQueryKey);
      useResetQuery(QueryAction.Invalidate, publicProfileQueryKey);
      // window.alert('inv query triggered');
      // queryClient.invalidateQueries({
      //   queryKey: [publicProfileQueryKey, socialQueryKey],
      // });
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
      useResetQuery(QueryAction.Invalidate, publicProfileQueryKey);
      // queryClient.invalidateQueries({
      //   queryKey: [publicProfileQueryKey, socialQueryKey],
      // });
    },
    onError: (error) => {},
  });
};
