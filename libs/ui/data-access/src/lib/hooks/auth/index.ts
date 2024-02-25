import { useMutation, useQuery } from '@tanstack/react-query';
import { SignInEmailRequestDto, SignUpEmailRequestDto } from '@tw/data';
import { isAxiosError } from 'axios';
// import Cookies from 'js-cookie';
import { http } from '../../http/api';
import { queryClient } from '../core';

/**
 * When used enabled in query this query can not be invalidated in mutation
 * source https://stackoverflow.com/questions/68577988/invalidate-queries-doesnt-work-react-query
 * this is the reason for initial auth request being trigger even there is no need for it, which throws 403
 * This will probably be fixed by maintainers in future till then req will be triggered regardless of condition
 */

const queryKey = 'authUser';

export const useAuthQuery = () => {
  return useQuery({
    queryKey: [queryKey],
    // should be replaced with ENV    SESSION_NAME
    // enabled: !!Cookies.get('twitter-clone-auth-session'),
    retry: false,
    queryFn: async () => {
      return await http.auth.authUser();
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (user: SignUpEmailRequestDto) => {
      return await http.auth.signUp(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
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
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return (error.message = error.response?.data.message);
      }
    },
  });
};
