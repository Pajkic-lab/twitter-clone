import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { FollowerListRequestDto, FollowerListResponseDto } from '@tw/data';
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

export const useFollowersQuery = ({
  followerOffset,
  followerLimit,
}: FollowerListRequestDto) => {
  return useQuery({
    queryKey: [socialGetFollowersKey],
    queryFn: async () => {
      const res = await http.social.getFollowers({
        followerOffset,
        followerLimit,
      });
      return res.data.payload;
    },
  });
};

export const useFollowersInfQuery = () => {
  return useInfiniteQuery<FollowerListResponseDto[], Error>({
    queryKey: ['followers'],
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      console.log('pageParam', pageParam);
      // if (pageParam === false) return [];
      const res = await http.social.getFollowers({
        followerOffset: pageParam as number,
        followerLimit: 10,
      });
      return res.data.payload;
    },

    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage', lastPage);
      console.log('allPages', allPages);
      return lastPage.length === 10 ? allPages.length * 10 : false;
    },
  });
};
