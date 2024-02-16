import { useMutation, useQuery } from '@tanstack/react-query';
import { SignInEmailRequestDto, SignUpEmailRequestDto } from '@tw/data';
import { http } from '../../http/api';
import { queryClient } from '../core';

export const useAuthQuery = () => {
  return useQuery({
    queryKey: [http.auth.authUser],
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
      // should be tested, does queryClient can be imported this way... and does invalidQuery works...
      queryClient.invalidateQueries({ queryKey: [http.auth.authUser] });
    },
    onError: (error) => {
      console.log('singUp error msg', error);
    },
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (user: SignInEmailRequestDto) => {
      return await http.auth.signIn(user);
    },
    onSuccess: () => {
      // should be tested, does queryClient can be imported this way... and does invalidQuery works...
      queryClient.invalidateQueries({ queryKey: [http.auth.authUser] });
    },
    onError: (error) => {
      console.log('singUp error msg', error);
    },
  });
};
