import { useMutation, useQuery } from '@tanstack/react-query';
import { NameUniqueRequestDto, SearchUserRequestDto, UpdateUserRequestDto } from '@tw/data';
import { errorParser } from '@tw/ui/common';
import { isAxiosError } from 'axios';
import { http } from '../../http/api';
import { queryClient } from '../core';

export const userQueryKey = 'userQueryKey';

export const mostPopularUsersQueryKey = () => {
  return ['mostPopularUser'];
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: [userQueryKey],
    queryFn: async () => {
      const res = await http.user.getUser();
      return res.data.payload;
    },
  });
};

export const useMostPopularUsersQuery = () => {
  return useQuery({
    queryKey: mostPopularUsersQueryKey(),
    queryFn: async () => {
      const res = await http.user.getMostPopularUsers();
      return res.data.payload;
    },
  });
};

export const useCheckUniqueUserNameMutation = () => {
  return useMutation({
    mutationFn: async (uniqueName: NameUniqueRequestDto) => {
      const res = await http.user.checkNameUniqueness(uniqueName);
      return res.data.payload;
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

export const useSearchUserMutation = () => {
  return useMutation({
    mutationFn: async (uniqueName: SearchUserRequestDto) => {
      const res = await http.user.getSearchedUser(uniqueName);
      return res.data.payload;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return (error.message = error.response?.data.message);
      }
    },
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: async (updateUserFormData: UpdateUserRequestDto) => {
      const res = await http.user.updateUser(updateUserFormData);
      return res.data.payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userQueryKey] });
    },
    onError: (error: any) => {
      return (error.message = errorParser(error.response?.data.message));
    },
  });
};
