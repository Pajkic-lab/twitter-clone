import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
// import { http } from '@tw/data-access';
import { http } from 'apps/client/src/http/api';
import { SearchUserRequestDto } from '@tw/data';

export const getMostPopularProfiles = createAsyncThunk(
  'utile/getMostPopularUsers',
  async (__, { rejectWithValue }) => {
    try {
      return await http.user.getMostPopularUsers();
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data);
        } else {
          return rejectWithValue({ message: error.message });
        }
      }
    }
  }
);

export const searchThunk = createAsyncThunk(
  'utile/search',
  async (searchData: SearchUserRequestDto, { rejectWithValue }) => {
    try {
      return await http.user.getSearchedUser(searchData);
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data);
        } else {
          return rejectWithValue({ message: error.message });
        }
      }
    }
  }
);

export const getFollowersThunk = createAsyncThunk(
  'utile/getFollowers',
  async (
    {
      followerOffset,
      followerLimit,
    }: { followerOffset: number; followerLimit: number },
    { rejectWithValue }
  ) => {
    try {
      return await http.social.getFollowers({ followerOffset, followerLimit });
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data);
        } else {
          return rejectWithValue({ message: error.message });
        }
      }
    }
  }
);

export const getFollowingUsersThunk = createAsyncThunk(
  'utile/getFollowingUsers',
  async (
    {
      followingOffset,
      followingLimit,
    }: { followingOffset: number; followingLimit: number },
    { rejectWithValue }
  ) => {
    try {
      return await http.social.getFollowingUsers({
        followingOffset,
        followingLimit,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data);
        } else {
          return rejectWithValue({ message: error.message });
        }
      }
    }
  }
);

export const getPPFollowersThunk = createAsyncThunk(
  'utile/getPPFollowers',
  async (
    {
      userId,
      PPfollowerOffset,
      PPfollowerLimit,
    }: { userId: number; PPfollowerOffset: number; PPfollowerLimit: number },
    { rejectWithValue }
  ) => {
    try {
      return await http.social.getPublicProfileFollowers({
        userId,
        PPfollowerOffset,
        PPfollowerLimit,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data);
        } else {
          return rejectWithValue({ message: error.message });
        }
      }
    }
  }
);

export const getPPFollowingUsersThunk = createAsyncThunk(
  'utile/getPPFollowingUsers',
  async (
    {
      userId,
      PPfollowingOffset,
      PPfollowingLimit,
    }: { userId: number; PPfollowingOffset: number; PPfollowingLimit: number },
    { rejectWithValue }
  ) => {
    try {
      return await http.social.getPublicProfileFollowingUsers({
        userId,
        PPfollowingOffset,
        PPfollowingLimit,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data);
        } else {
          return rejectWithValue({ message: error.message });
        }
      }
    }
  }
);
