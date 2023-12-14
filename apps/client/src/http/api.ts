import { AxiosResponse } from 'axios';
import { contractClient, httpClient } from './client';
import { UpdateUser } from '../types';
import {
  SignUpEmailRequestDto,
  SignUpEmailResponseDto,
  SignInEmailRequestDto,
  AuthenticationResponseDto,
  SignInEmailResponseDto,
  NameUniqueRequestDto,
  HttpResponse,
  SocialStatsResponseDto,
  NameUniqueResponseDto,
  NameUniqueUpdateResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  PublicUserResponseDto,
  MostPopularUsersResponseDto,
  FollowUserRequestDto,
  FollowUserResponseDto,
  UnFollowUserRequestDto,
  SearchUserRequestDto,
  SearchUsersResponseDto,
  FollowerListRequestDto,
  FollowerListResponseDto,
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
    // refactor this to use GET method
    checkNameUniqueness(
      data: NameUniqueRequestDto
    ): Promise<AxiosResponse<HttpResponse<NameUniqueResponseDto>>> {
      return httpClient.post('auth/name-unique', data);
    },
    updateUserUniqueName(
      data: NameUniqueRequestDto
    ): Promise<AxiosResponse<HttpResponse<NameUniqueUpdateResponseDto>>> {
      return httpClient.patch('auth/name-unique', data);
    },
    updateUser(
      updateUser: UpdateUserRequestDto
    ): Promise<AxiosResponse<HttpResponse<UpdateUserResponseDto>>> {
      return httpClient.patch('auth/update/user', updateUser);
    },
    getPublicUser(id: number): Promise<
      AxiosResponse<
        HttpResponse<{
          user: PublicUserResponseDto;
          socialStats: SocialStatsResponseDto;
          followingStatus: boolean;
        }>
      >
    > {
      return httpClient.get(`auth/public/user/${id}`);
    },

    getMostPopularUsers(): Promise<
      AxiosResponse<HttpResponse<MostPopularUsersResponseDto[]>>
    > {
      return httpClient.get('utile/most/popular/users');
    },
  },
  social: {
    followUser(
      userId: FollowUserRequestDto
    ): Promise<AxiosResponse<HttpResponse<FollowUserResponseDto>>> {
      return httpClient.post('auth/follow/user', userId);
    },
    // this route is not refactored completely, do not know what is prisma returning, do get users first
    unFollowUser(unFollowUser: UnFollowUserRequestDto) {
      return httpClient.delete(`auth/un-follow/user/${unFollowUser.userId}`);
    },
    // route is hitting Utile controller
    getSearchTerm({
      searchData,
    }: SearchUserRequestDto): Promise<
      AxiosResponse<HttpResponse<SearchUsersResponseDto[]>>
    > {
      return httpClient.get(`utile/search/${searchData}`);
    },
    // work in progress, reducer should be finished
    getFollowers({
      followerOffset,
      followerLimit,
    }: FollowerListRequestDto): Promise<
      AxiosResponse<HttpResponse<FollowerListResponseDto[]>>
    > {
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
