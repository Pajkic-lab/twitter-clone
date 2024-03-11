import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { http } from '../../http/api';

export const socialGetFollowersKey = 'socialGetFollowersKey';
export const socialQueryKey = 'socialQueryKey';

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
