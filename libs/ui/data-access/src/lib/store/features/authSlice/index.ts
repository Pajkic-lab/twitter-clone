import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AnyAsyncThunk,
  RejectedWithValueActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';
import Cookies from 'js-cookie';
import {
  authUserThunk,
  checkNameUniqueness,
  followUserThunk,
  signInThunk,
  signOutThunk,
  signUpThunk,
  unFollowUserThunk,
  updateUser,
  updateUserUniqueName,
} from './thunk';

interface AuthState {
  id: number | null;
  name: string;
  email: string;
  avatar: string;
  cover: string;
  uniqueName: string;
  bio: string;
  location: string;
  website: string;
  createdAt: string;
  // What is followingStatus for where is it being used???
  // This should probably be refactored, because in Public Profile followingStatus is being used and do to bad code, states between these two have to be 1:1
  followingStatus?: boolean;
  isLoading: boolean;
  // this whole slice should be split, probably to auth and user,
  userIsSubmittingAuthData: boolean;
  // this is flag when checking does unique name already exist
  uniqueNameIsSubmitting: boolean;
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
  userIsSubmittingAuthData: false, // should be refactored there is not
  isAuth: Cookies.get('twitter-clone-auth-session') ? true : false,
  errorMessage: '',
  isNameUnique: undefined,
  uniqueNameIsSubmitting: false, // this was added subsequently, should be probably refactored
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
      .addCase(signUpThunk.pending, (state) => {
        state.userIsSubmittingAuthData = true;
      })
      .addCase(signUpThunk.fulfilled, (state, payload) => {
        // isAuth set to true should probably be done in auth request, should research where this flag is being used...
        state.isAuth = true;
        state.userIsSubmittingAuthData = false;
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
          state.userIsSubmittingAuthData = false;
        }
      )

      // Sign in logic
      .addCase(signInThunk.pending, (state) => {
        state.userIsSubmittingAuthData = true;
      })
      .addCase(signInThunk.fulfilled, (state, payload) => {
        // isAuth set to true should probably be done in auth request, should research where this flag is being used...
        state.isAuth = true;
        state.userIsSubmittingAuthData = false;
      })
      .addCase(
        signInThunk.rejected,
        (
          state,
          {
            payload,
          }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>
        ) => {
          state.errorMessage = payload.message;
          state.userIsSubmittingAuthData = false;
        }
      )

      // Authenticate user
      .addCase(authUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUserThunk.fulfilled, (state, payload) => {
        // const userData = payload.payload?.data?.payload?.user;
        // const socialStats = payload.payload?.data?.payload?.socialStats;
        // state.id = userData?.id ?? state.id;
        // state.name = userData?.name ?? state.name;
        // state.email = userData?.email ?? state.email;
        // state.uniqueName = userData?.uniqueName ?? state.uniqueName;
        // state.avatar = userData?.avatar ?? state.avatar;
        // state.cover = userData?.cover ?? state.cover;
        // state.bio = userData?.bio ?? state.bio;
        // state.location = userData?.location ?? state.location;
        // state.website = userData?.website ?? state.website;
        // state.createdAt = userData?.createdAt ?? state.createdAt;
        // state.followingCount =
        //   socialStats?.followingCount ?? state.followingCount;
        // state.followersCount =
        //   socialStats?.followersCount ?? state.followersCount;
        // state.isLoading = false;
      })
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
      .addCase(checkNameUniqueness.pending, (state) => {
        state.uniqueNameIsSubmitting = true;
      })
      .addCase(checkNameUniqueness.fulfilled, (state, payload) => {
        if (payload.payload?.data.payload) {
          state.isNameUnique = payload.payload?.data.payload.isNameUnique;
        }
        state.uniqueNameIsSubmitting = false;
      })
      .addCase(
        checkNameUniqueness.rejected,
        (
          state,
          {
            payload,
          }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>
        ) => {
          state.errorMessage = payload.message;
          state.uniqueNameIsSubmitting = false;
        }
      )

      // do not know what is this for, was not marked
      .addCase(updateUserUniqueName.pending, (state) => {
        state.uniqueNameIsSubmitting = true;
      })
      .addCase(updateUserUniqueName.fulfilled, (state, payload) => {
        state.uniqueName =
          payload.payload?.data.payload.uniqueName ?? state.uniqueName;
        state.uniqueNameIsSubmitting = false;
      })
      .addCase(
        updateUserUniqueName.rejected,
        (
          state,
          {
            payload,
          }: PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>
        ) => {
          state.errorMessage = payload.message;
          state.uniqueNameIsSubmitting = false;
        }
      )

      // Update User
      .addCase(updateUser.fulfilled, (state, payload) => {
        const userData = payload.payload?.data?.payload;

        state.name = userData?.name ?? state.name;
        state.avatar = userData?.avatar ?? state.avatar;
        state.cover = userData?.cover ?? state.cover;
        state.bio = userData?.bio ?? state.bio;
        state.location = userData?.location ?? state.location;
        state.website = userData?.website ?? state.website;
        state.createdAt = userData?.createdAt ?? state.createdAt;
      })
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
