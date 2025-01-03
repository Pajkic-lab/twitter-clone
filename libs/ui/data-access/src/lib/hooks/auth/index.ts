import { useMutation, useQuery } from '@tanstack/react-query';
import { SignInEmailRequestDto, SignUpEmailRequestDto } from '@tw/data';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { http } from '../../http/api';
import { queryClient } from '../core';

/**
 * useAuthQuery should be called only from PageManager, nowhere else, access data from jotai
 */

/**
 * When used enabled in query this query can not be invalidated in mutation
 * source https://stackoverflow.com/questions/68577988/invalidate-queries-doesnt-work-react-query
 */

export const authQueryKey = 'authQueryKey';

export const useAuthQuery = () => {
  return useQuery({
    queryKey: [authQueryKey],
    // enabled: !!Cookies.get('twitter-clone-auth-session'),
    retry: false,
    queryFn: async () => {
      if (!Cookies.get('twitter-clone-auth-session')) return null; // replace hardcoded var with env var!
      const res = await http.auth.authUser();
      return res.data.payload;
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (user: SignUpEmailRequestDto) => {
      return await http.auth.signUp(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authQueryKey] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return (error.message = error.response?.data.message);
      }
    },
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (user: SignInEmailRequestDto) => {
      return await http.auth.signIn(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [authQueryKey] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return (error.message = error.response?.data.message);
      }
    },
  });
};

export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return await http.auth.signOut();
    },
    onSuccess: () => {
      Cookies.remove('twitter-clone-auth-session'); // replace hardcoded value with env var.
      queryClient.removeQueries({ queryKey: [authQueryKey] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return (error.message = error.response?.data.message);
      }
    },
  });
};
