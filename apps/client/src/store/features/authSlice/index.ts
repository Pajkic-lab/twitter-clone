import {
  AnyAsyncThunk,
  RejectedWithValueActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';
import {
  authUserThunk,
  signUpThunk,
  signInThunk,
  signOutThunk,
  checkNameUniqueness,
  updateUserUniqueName,
  updateUser,
  followUserThunk,
  unFollowUserThunk,
} from './thunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { SocialStats, User } from 'apps/client/src/types';

interface AuthState extends User {
  isLoading: boolean;
  isAuth: boolean;
  errorMessage: string;
  isNameUnique: boolean | undefined;
  followingCount: number;
  followersCount: number;
  followIsSubmitting: boolean;
}

const initialState: AuthState = {
  id: null,
  name: '',
  email: '',
  avatar: '',
  cover: '',
  uniqueName: '',
  bio: '',
  location: '',
  website: '',
  createdAt: '',
  isLoading: false,
  isAuth: Cookies.get('twitter-clone-auth-session') ? true : false,
  errorMessage: '',
  isNameUnique: undefined,
  followingCount: 0,
  followersCount: 0,
  followIsSubmitting: false,
  followingStatus: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      return initialState;
    },
  },
  /**
   * Do not destructure state inside extraReducers because code wont work for some reason
   */
  extraReducers: (builder) => {
    builder

      // Sign up logic
      .addCase(signUpThunk.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(
        signUpThunk.rejected,
        (
          state,
          {
            payload,
          }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message;
        }
      )

      // Sign in logic
      .addCase(signInThunk.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(
        signInThunk.rejected,
        (
          state,
          {
            payload,
          }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message;
        }
      )

      // Authenticate user
      .addCase(authUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        authUserThunk.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            | AxiosResponse<{ user: User; socialStats: SocialStats }, any>
            | undefined
          >
        ) => {
          if (payload && payload.data) {
            state.id = payload.data.user.id as number;
            state.name = payload.data.user.name;
            state.email = payload.data.user.email;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            state.uniqueName = payload.data.user.uniqueName as string;
            state.avatar = payload.data.user.avatar;
            state.cover = payload.data.user.cover;
            state.bio = payload.data.user.bio;
            state.location = payload.data.user.location;
            state.website = payload.data.user.website;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            state.createdAt = payload.data.user.createdAt as string;
            state.followingCount = payload.data.socialStats.followingCount;
            state.followersCount = payload.data.socialStats.followersCount;
          }
          state.isLoading = false;
        }
      )
      .addCase(authUserThunk.rejected, (state) => {
        state.errorMessage = '';
        state.isLoading = false;
        state.isAuth = false;
      })

      // Sign out logic
      .addCase(signOutThunk.fulfilled, (state) => {
        Cookies.remove('twitter-clone-auth-session');
        state.isAuth = false;
      })
      .addCase(signOutThunk.rejected, (state) => {
        state.errorMessage = '';
      })

      // Name is unique
      .addCase(
        checkNameUniqueness.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ isNameUnique: boolean }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            state.isNameUnique = payload.data.isNameUnique;
          }
        }
      )
      .addCase(
        checkNameUniqueness.rejected,
        (
          state,
          {
            payload,
          }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message;
        }
      )

      // Update unique name
      .addCase(
        updateUserUniqueName.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ uniqueName: string }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            state.uniqueName = payload.data.uniqueName as string;
          }
        }
      )
      .addCase(
        updateUserUniqueName.rejected,
        (
          state,
          {
            payload,
          }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message;
        }
      )

      // Update User
      .addCase(
        updateUser.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<AxiosResponse<{ user: User }, any> | undefined>
        ) => {
          if (payload && payload.data) {
            state.name = payload.data.user.name;
            state.avatar = payload.data.user.avatar;
            state.cover = payload.data.user.cover;
            state.bio = payload.data.user.bio;
            state.location = payload.data.user.location;
            state.website = payload.data.user.website;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            state.createdAt = payload.data.user.createdAt as string;
          }
        }
      )
      .addCase(
        updateUser.rejected,
        (
          state,
          {
            payload,
          }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          state.errorMessage = payload.message;
        }
      )

      // Follow user
      .addCase(followUserThunk.pending, (state) => {
        state.followIsSubmitting = true;
      })
      .addCase(followUserThunk.fulfilled, (state) => {
        state.followingCount = state.followingCount + 1;
        state.followIsSubmitting = false;
      })
      .addCase(followUserThunk.rejected, (state) => {
        state.errorMessage = '';
        state.followIsSubmitting = false;
      })

      // Unfollow user
      .addCase(unFollowUserThunk.pending, (state) => {
        state.followIsSubmitting = true;
      })
      .addCase(unFollowUserThunk.fulfilled, (state) => {
        state.followingCount = state.followingCount - 1;
        state.followIsSubmitting = false;
      })
      .addCase(unFollowUserThunk.rejected, (state) => {
        state.errorMessage = '';
        state.followIsSubmitting = false;
      });
  },
});

export default authSlice.reducer;
