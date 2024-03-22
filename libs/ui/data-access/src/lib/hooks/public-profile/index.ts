import { useQuery } from '@tanstack/react-query';
import { http } from '../../http/api';

export const publicProfileQueryKey = (userId: any) => {
  return ['publicUser', userId];
};

export const usePublicProfileQuery = (userId: number) => {
  return useQuery({
    queryKey: publicProfileQueryKey(userId),
    queryFn: async () => {
      const res = await http.user.getPublicUser(userId);
      return res.data.payload;
    },
  });
};
