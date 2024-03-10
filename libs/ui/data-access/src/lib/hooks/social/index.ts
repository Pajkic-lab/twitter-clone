import { useQuery } from '@tanstack/react-query';
import { FollowerListRequestDto } from '@tw/data';
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
