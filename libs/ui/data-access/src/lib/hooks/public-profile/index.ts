import { useQuery } from '@tanstack/react-query';
import { http } from '../../http/api';

export const publicProfileQueryKey = ['publicUser', 'publicProfileQueryKey'];

/**
 * When ever call query every subsequent request has to be invalidated.
 */
export const usePublicProfileQuery = (userId: number) => {
  return useQuery({
    queryKey: [publicProfileQueryKey],
    queryFn: async () => {
      const res = await http.user.getPublicUser(userId);
      return res.data.payload;
    },
  });
};
