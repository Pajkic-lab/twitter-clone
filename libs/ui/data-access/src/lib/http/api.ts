import {
  AuthenticationResponseDto,
  FollowUserRequestDto,
  FollowUserResponseDto,
  FollowerListRequestDto,
  FollowerListResponseDto,
  FollowingListRequestDto,
  FollowingListResponseDto,
  HttpResponse,
  MostPopularUsersResponseDto,
  NameUniqueRequestDto,
  NameUniqueResponseDto,
  NameUniqueUpdateResponseDto,
  PublicProfileFollowerListRequestDto,
  PublicProfileFollowingListRequestDto,
  PublicUserResponseDto,
  SearchUserRequestDto,
  SearchUsersResponseDto,
  SignInEmailRequestDto,
  SignInEmailResponseDto,
  SignUpEmailRequestDto,
  SignUpEmailResponseDto,
  SocialStatsResponseDto,
  UnFollowUserRequestDto,
  UnFollowUserResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  UserResponseDto,
} from '@tw/data';
import { AxiosResponse } from 'axios';
import { contractClient, httpClient } from './client';

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
      return httpClient.get('auth/google/sign-in');
    },
    authUser(): Promise<
      AxiosResponse<HttpResponse<AuthenticationResponseDto>>
    > {
      return httpClient.get('auth');
    },
    signOut() {
      //rename at backend to signOut
      return httpClient.get('auth/sign-out');
    },
  },
  user: {
    getUser(): Promise<AxiosResponse<HttpResponse<UserResponseDto>>> {
      return httpClient.get('user');
    },
    // refactor this to use GET method
    checkNameUniqueness(
      data: NameUniqueRequestDto
    ): Promise<AxiosResponse<HttpResponse<NameUniqueResponseDto>>> {
      return httpClient.post('user/name-unique', data);
    },
    updateUserUniqueName(
      data: NameUniqueRequestDto
    ): Promise<AxiosResponse<HttpResponse<NameUniqueUpdateResponseDto>>> {
      return httpClient.patch('user/name-unique', data);
    },
    updateUser(
      updateUser: UpdateUserRequestDto
    ): Promise<AxiosResponse<HttpResponse<UpdateUserResponseDto>>> {
      return httpClient.patch('user', updateUser);
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
      return httpClient.get(`user/public/${id}`);
    },
    getMostPopularUsers(): Promise<
      AxiosResponse<HttpResponse<MostPopularUsersResponseDto[]>>
    > {
      return httpClient.get('user/most-popular');
    },
    getSearchedUser({
      searchData,
    }: SearchUserRequestDto): Promise<
      AxiosResponse<HttpResponse<SearchUsersResponseDto[]>>
    > {
      return httpClient.get(`user/search/${searchData}`);
    },
  },
  social: {
    getSocialStats(): Promise<
      AxiosResponse<HttpResponse<SocialStatsResponseDto>>
    > {
      return httpClient.get('social/stats');
    },
    followUser(
      userId: FollowUserRequestDto
    ): Promise<AxiosResponse<HttpResponse<FollowUserResponseDto>>> {
      return httpClient.post('social/follow/user', userId);
    },
    unFollowUser(
      unFollowUser: UnFollowUserRequestDto
    ): Promise<AxiosResponse<HttpResponse<UnFollowUserResponseDto>>> {
      return httpClient.delete(`social/un-follow/user/${unFollowUser.userId}`);
    },
    // Do I need 4 following routes, can this be only one route with extra argument to designate what data to return???
    getFollowers({
      followerOffset,
      followerLimit,
    }: FollowerListRequestDto): Promise<
      AxiosResponse<HttpResponse<FollowerListResponseDto[]>>
    > {
      return httpClient.get(
        `social/followers/${followerOffset}/${followerLimit}`
      );
    },
    getFollowingUsers({
      followingOffset,
      followingLimit,
    }: FollowingListRequestDto): Promise<
      AxiosResponse<HttpResponse<FollowingListResponseDto[]>>
    > {
      return httpClient.get(
        `social/following/${followingOffset}/${followingLimit}`
      );
    },
    getPublicProfileFollowers({
      PPfollowerOffset,
      PPfollowerLimit,
      userId,
    }: PublicProfileFollowerListRequestDto): Promise<
      AxiosResponse<HttpResponse<FollowerListResponseDto[]>>
    > {
      return httpClient.get(
        `social/public-profile/followers/${userId}/${PPfollowerOffset}/${PPfollowerLimit}`
      );
    },
    getPublicProfileFollowingUsers({
      userId,
      PPfollowingOffset,
      PPfollowingLimit,
    }: PublicProfileFollowingListRequestDto): Promise<
      AxiosResponse<HttpResponse<FollowingListResponseDto[]>>
    > {
      return httpClient.get(
        `social/public-profile/following/${userId}/${PPfollowingOffset}/${PPfollowingLimit}`
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
