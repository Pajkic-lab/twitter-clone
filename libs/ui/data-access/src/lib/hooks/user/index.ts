import { useMutation, useQuery } from '@tanstack/react-query';
import { NameUniqueRequestDto } from '@tw/data';
import { isAxiosError } from 'axios';
import { http } from '../../http/api';
import { queryClient } from '../core';

export const userQueryKey = 'userQueryKey';

export const useUserQuery = () => {
  return useQuery({
    queryKey: [userQueryKey],
    queryFn: async () => {
      return await http.user.getUser();
    },
  });
};

export const useCheckUniqueUserNameMutation = () => {
  return useMutation({
    mutationFn: async (uniqueName: NameUniqueRequestDto) => {
      return await http.user.checkNameUniqueness(uniqueName);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return (error.message = error.response?.data.message);
      }
    },
  });
};

export const useUpdateUniqueUserNameMutation = () => {
  return useMutation({
    mutationFn: async (uniqueName: NameUniqueRequestDto) => {
      return await http.user.updateUserUniqueName(uniqueName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userQueryKey] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return (error.message = error.response?.data.message);
      }
    },
  });
};
