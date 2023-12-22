import { createSlice } from '@reduxjs/toolkit';
import { User } from 'apps/client/src/types';
import { followUserThunk, unFollowUserThunk } from '../authSlice/thunk';
import { getPublicProfile } from './thunk';

interface PublicProfileState extends Omit<User, 'email'> {
  isLoading: boolean;
  errorMessage: string;
  followingCount: number;
  followersCount: number;
  followIsSubmitting: boolean;
}

const initialState: PublicProfileState = {
  id: null,
  name: '',
  avatar: '',
  cover: '',
  uniqueName: '',
  bio: '',
  location: '',
  website: '',
  createdAt: '',
  isLoading: false,
  errorMessage: '',
  followingCount: 0,
  followersCount: 0,
  followIsSubmitting: false,
  followingStatus: false,
};

export const publicProfileSlice = createSlice({
  name: 'publicProfile',
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder

      // Get user
      .addCase(getPublicProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicProfile.fulfilled, (state, payload) => {
        state.id = payload.payload?.data.payload.user.id!;
        state.name = payload.payload?.data.payload.user.name!;
        state.uniqueName = payload.payload?.data.payload.user.uniqueName!;
        state.avatar = payload.payload?.data.payload.user.avatar!;
        state.cover = payload.payload?.data.payload.user.cover!;
        state.bio = payload.payload?.data.payload.user.bio!;
        state.location = payload.payload?.data.payload.user.location!;
        state.website = payload.payload?.data.payload.user.website!;
        state.createdAt = payload.payload?.data.payload.user.createdAt!;
        state.followingCount =
          payload.payload?.data.payload.socialStats.followingCount!;
        state.followersCount =
          payload.payload?.data.payload.socialStats.followersCount!;
        state.followingStatus = payload.payload?.data.payload.followingStatus!;
        state.isLoading = false;
      })
      .addCase(getPublicProfile.rejected, (state) => {
        state.errorMessage = 'no existing user'; // refactor logic for this operation
        state.isLoading = false;
      })

      // Follow user
      .addCase(followUserThunk.pending, (state) => {
        state.followIsSubmitting = true;
      })
      .addCase(followUserThunk.fulfilled, (state) => {
        state.followersCount = state.followersCount + 1;
        state.followingStatus = true;
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
        state.followersCount = state.followersCount - 1;
        state.followingStatus = false;
        state.followIsSubmitting = false;
      })
      .addCase(unFollowUserThunk.rejected, (state) => {
        state.errorMessage = '';
        state.followIsSubmitting = false;
      });
  },
});

export const { resetState } = publicProfileSlice.actions;

export default publicProfileSlice.reducer;
