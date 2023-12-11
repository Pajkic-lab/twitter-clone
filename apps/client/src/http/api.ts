import { AxiosResponse } from 'axios';
import { contractClient, httpClient } from './client';
import { UpdateUser } from '../types';
import {
  SignUpEmailRequestDto,
  SignUpEmailResponseDto,
  SignInEmailRequestDto,
  AuthenticationResponseDto,
  SignInEmailResponseDto,
  NameUniquenessRequestDto,
  NameUniquenessResponseDto,
  HttpResponse,
  SocialStatsResponseDto,
} from '@tw/data';

export const http = {
  auth: {
    signUp(
      user: SignUpEmailRequestDto
    ): Promise<AxiosResponse<HttpResponse<SignUpEmailResponseDto>>> {
      return httpClient.post('auth/sign-up', user);
    },
    signIn({
      email,
      password,
    }: SignInEmailRequestDto): Promise<
      AxiosResponse<HttpResponse<SignInEmailResponseDto>>
    > {
      return httpClient.post('auth/sign-in', {
        username: 'placeholder',
        email,
        password,
      });
    },
    googleAuthenticate() {
      return httpClient.get('auth/google/login');
    },
    authUser(): Promise<
      AxiosResponse<
        HttpResponse<{
          user: AuthenticationResponseDto;
          socialStats: SocialStatsResponseDto;
        }>
      >
    > {
      return httpClient.get('auth/user');
    },
    signOut() {
      return httpClient.get('auth/logout');
    },
  },
  user: {
    // add DTO response for following api calls
    // try to resolve this by adding ts-rest library
    checkNameUniqueness(data: NameUniquenessRequestDto) {
      return httpClient.post('auth/name-uniqueness', data);
    },
    updateUserUniqueName(data: NameUniquenessRequestDto) {
      return httpClient.post('auth/create-unique-name', data);
    },
    //
    updateUser(updateUser: UpdateUser) {
      return httpClient.patch('auth/update/user', { updateUser });
    },
    getPublicUser(id: number) {
      return httpClient.get(`auth/public/user/${id}`);
    },
    followUser(userId: number) {
      return httpClient.post('auth/follow/user', { userId });
    },
    unFollowUser(userId: number) {
      return httpClient.delete(`auth/unfollow/user/${userId}`);
    },
  },
  social: {
    getMostPopularUsers() {
      return httpClient.get('utile/most/popular/users');
    },
    getSearchTerm(searchData: string) {
      return httpClient.get(`utile/search/${searchData}`);
    },
    getFollowers({
      followerOffset,
      followerLimit,
    }: {
      followerOffset: number;
      followerLimit: number;
    }) {
      return httpClient.get(
        `utile/followers/${followerOffset}/${followerLimit}`
      );
    },
    getFollowingUsers({
      followingOffset,
      followingLimit,
    }: {
      followingOffset: number;
      followingLimit: number;
    }) {
      return httpClient.get(
        `utile/following/${followingOffset}/${followingLimit}`
      );
    },
    getPPFollowers({
      PPfollowerOffset,
      PPfollowerLimit,
      userId,
    }: {
      PPfollowerOffset: number;
      PPfollowerLimit: number;
      userId: number;
    }) {
      return httpClient.get(
        `utile/pp/followers/${userId}/${PPfollowerOffset}/${PPfollowerLimit}`
      );
    },
    getPPFollowingUsers({
      userId,
      PPfollowingOffset,
      PPfollowingLimit,
    }: {
      userId: number;
      PPfollowingOffset: number;
      PPfollowingLimit: number;
    }) {
      return httpClient.get(
        `utile/pp/following/${userId}/${PPfollowingOffset}/${PPfollowingLimit}`
      );
    },
  },
  experimental: {
    test() {
      return contractClient.createPost({
        body: {
          title: 'Post Title',
          body: 'Post Body',
        },
      });
    },
  },
};
