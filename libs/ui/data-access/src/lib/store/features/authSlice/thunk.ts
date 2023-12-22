import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FollowUserRequestDto,
  NameUniqueRequestDto,
  SignInEmailRequestDto,
  SignUpEmailRequestDto,
  UnFollowUserRequestDto,
  UpdateUserRequestDto,
} from '@tw/data';
import { http } from '@tw/ui/data-access';
import { isAxiosError } from 'axios';

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (user: SignUpEmailRequestDto, { rejectWithValue }) => {
    try {
      return await http.auth.signUp(user);
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

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (user: SignInEmailRequestDto, { rejectWithValue }) => {
    try {
      return await http.auth.signIn(user);
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

export const authenticateViaGoogle = createAsyncThunk(
  'auth/google',
  async (__, { rejectWithValue }) => {
    try {
      return await http.auth.googleAuthenticate();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const authUserThunk = createAsyncThunk(
  'auth/authUser',
  async (__, { rejectWithValue }) => {
    try {
      return await http.auth.authUser();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const signOutThunk = createAsyncThunk(
  'auth/signOut',
  async (__, { rejectWithValue }) => {
    try {
      return await http.auth.signOut();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const checkNameUniqueness = createAsyncThunk(
  'auth/checkNameUniqueness',
  async (data: NameUniqueRequestDto, { rejectWithValue }) => {
    try {
      return await http.user.checkNameUniqueness(data);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const updateUserUniqueName = createAsyncThunk(
  'auth/updateUserUniqueName',
  async (data: NameUniqueRequestDto, { rejectWithValue }) => {
    try {
      return await http.user.updateUserUniqueName(data);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (updateUser: UpdateUserRequestDto, { rejectWithValue }) => {
    try {
      return await http.user.updateUser(updateUser);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const followUserThunk = createAsyncThunk(
  'auth/followUser',
  // rename userId to followUser or something
  async (userId: FollowUserRequestDto, { rejectWithValue }) => {
    try {
      return await http.social.followUser(userId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const unFollowUserThunk = createAsyncThunk(
  'auth/unFollowUser',
  // rename userId to unFollowUser or something
  async (userId: UnFollowUserRequestDto, { rejectWithValue }) => {
    try {
      return await http.social.unFollowUser(userId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);
