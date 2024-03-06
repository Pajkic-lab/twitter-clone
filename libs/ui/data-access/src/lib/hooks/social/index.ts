import { useQuery } from '@tanstack/react-query';
import { http } from '../../http/api';

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
