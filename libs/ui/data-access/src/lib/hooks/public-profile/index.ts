import { useQuery } from '@tanstack/react-query';
import { http } from '../../http/api';
import { queryClient } from '../core';

const publicProfileQueryKey = 'publicProfileQueryKey';

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

export function useInvalidatePublicProfile() {
  queryClient.removeQueries({ queryKey: [publicProfileQueryKey] });
}
