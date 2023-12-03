import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUser } from 'apps/client/src/types';
import { isAxiosError } from 'axios';
import {
  SignInEmailRequestDto,
  SignUpEmailRequestDto,
  NameUniquenessRequestDto,
} from '@tw/data';
import { http } from 'apps/client/src/http/api';

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
  async (data: NameUniquenessRequestDto, { rejectWithValue }) => {
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
  async (data: NameUniquenessRequestDto, { rejectWithValue }) => {
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
  async (updateUser: UpdateUser, { rejectWithValue }) => {
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
  async (userId: number, { rejectWithValue }) => {
    try {
      return await http.user.followUser(userId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const unFollowUserThunk = createAsyncThunk(
  'auth/unFollowUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await http.user.unFollowUser(userId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);
