import { createSlice } from '@reduxjs/toolkit';
import { MostPopularUsersResponseDto, SearchUsersResponseDto } from '@tw/data';
import { User } from 'apps/client/src/types';
import { followUserThunk, unFollowUserThunk } from '../authSlice/thunk';
import {
  getFollowersThunk,
  getFollowingUsersThunk,
  getMostPopularProfiles,
  getPPFollowersThunk,
  getPPFollowingUsersThunk,
  searchThunk,
} from './thunk';

interface UtileState {
  mostPopularUsers: MostPopularUsersResponseDto[];
  mostPopularUsersIsLoading: boolean;
  searchResponse: SearchUsersResponseDto[];
  searchIsLoading: boolean;
  errorMessage: string;
  followersList: User[];
  followerListIsLoading: boolean;
  followerOffset: number;
  followerLimit: number;
  followerHasMore: boolean;
  followingList: User[];
  followingListIsLoading: boolean;
  followingOffset: number;
  followingLimit: number;
  followingHasMore: boolean;
  //
  PPfollowersList: User[];
  PPfollowerListIsLoading: boolean;
  PPfollowerOffset: number;
  PPfollowerLimit: number;
  PPfollowerHasMore: boolean;
  PPfollowingList: User[];
  PPfollowingListIsLoading: boolean;
  PPfollowingOffset: number;
  PPfollowingLimit: number;
  PPfollowingHasMore: boolean;
}

const initialState: UtileState = {
  mostPopularUsers: [],
  mostPopularUsersIsLoading: false,
  searchResponse: [],
  searchIsLoading: false,
  errorMessage: '',
  followersList: [],
  followerListIsLoading: false,
  followerOffset: 0,
  followerLimit: 20,
  followerHasMore: true,
  followingList: [],
  followingListIsLoading: false,
  followingOffset: 0,
  followingLimit: 20,
  followingHasMore: true,
  //
  PPfollowersList: [],
  PPfollowerListIsLoading: false,
  PPfollowerOffset: 0,
  PPfollowerLimit: 20,
  PPfollowerHasMore: true,
  PPfollowingList: [],
  PPfollowingListIsLoading: false,
  PPfollowingOffset: 0,
  PPfollowingLimit: 20,
  PPfollowingHasMore: true,
};

export const utileSlice = createSlice({
  name: 'utile',
  initialState,
  reducers: {
    resetSearchRespons: (state) => {
      state.searchResponse = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // Most popular profiles
      .addCase(getMostPopularProfiles.pending, (state) => {
        state.mostPopularUsersIsLoading = true;
      })
      .addCase(getMostPopularProfiles.fulfilled, (state, payload) => {
        state.mostPopularUsers = [...(payload.payload?.data.payload ?? [])];
      })
      .addCase(getMostPopularProfiles.rejected, (state) => {
        state.errorMessage = '';
        state.mostPopularUsersIsLoading = false;
      })

      // Search response
      .addCase(searchThunk.pending, (state) => {
        state.searchIsLoading = true;
      })
      .addCase(searchThunk.fulfilled, (state, payload) => {
        state.searchResponse = payload.payload?.data.payload!;
        state.searchIsLoading = false;
      })
      .addCase(searchThunk.rejected, (state) => {
        state.errorMessage = '';
        state.searchIsLoading = false;
      })

      // Get followers
      .addCase(getFollowersThunk.pending, (state) => {
        state.followerListIsLoading = true;
      })
      .addCase(getFollowersThunk.fulfilled, (state, payload) => {
        if (payload.payload?.data.payload && payload.payload?.data.payload) {
          const firstUserId = payload.payload.data.payload[0]?.id;
          if (firstUserId !== null && firstUserId !== undefined) {
            const followersIds = state.followersList.map((el) => el.id);
            const res = followersIds.includes(firstUserId);
            if (!res) {
              state.followersList = [
                ...state.followersList,
                ...payload.payload.data.payload,
              ];
              state.followerOffset = state.followerOffset + state.followerLimit;
            }
          }
        }
        if (payload?.payload?.data?.payload?.length ?? 0 < 1) {
          // this code must be tested !!!!!!!!!!!
          state.followerHasMore = false;
        }

        state.followerListIsLoading = false;
      })
      .addCase(getFollowersThunk.rejected, (state) => {
        state.errorMessage = '';
        state.followerListIsLoading = false;
      })

      // Get following
      .addCase(getFollowingUsersThunk.pending, (state) => {
        state.followingListIsLoading = true;
      })
      .addCase(getFollowingUsersThunk.fulfilled, (state, payload) => {
        if (payload.payload?.data.payload.length) {
          const firstUserId = payload.payload.data.payload[0]?.id;
          if (firstUserId !== null && firstUserId !== undefined) {
            const followingIds = state.followingList.map((el) => el.id);
            const res = followingIds.includes(firstUserId);
            if (!res) {
              state.followingList = [
                ...state.followingList,
                ...payload.payload.data.payload,
              ];
              state.followingOffset =
                state.followingOffset + state.followingLimit;
            }
          }
        }
        if (payload?.payload?.data?.payload?.length ?? 0 < 1) {
          // this code must be tested !!!!!!!!!!!
          state.followingHasMore = false;
        }

        state.followingListIsLoading = false;
      })
      .addCase(getFollowingUsersThunk.rejected, (state) => {
        state.errorMessage = '';
        state.followingListIsLoading = false;
      })

      // Follow user
      .addCase(followUserThunk.fulfilled, (state, payload) => {
        state.followersList = state.followersList.map((user) => {
          if (user.id === payload.payload?.data.payload.userIdToFollow) {
            return {
              ...user,
              followingStatus: true,
            };
          }
          return user;
        });

        state.followingList = state.followingList.map((user) => {
          if (user.id === payload.payload?.data.payload.userIdToFollow) {
            return {
              ...user,
              followingStatus: true,
            };
          }
          return user;
        });
      })

      // Unfollow user
      .addCase(unFollowUserThunk.fulfilled, (state, payload) => {
        state.followersList = state.followersList.map((user) => {
          if (user.id === payload.payload?.data.payload.userIdToUnFollow) {
            return {
              ...user,
              followingStatus: false,
            };
          }
          return user;
        });

        state.followingList = state.followingList.map((user) => {
          if (user.id === payload.payload?.data.payload.userIdToUnFollow) {
            return {
              ...user,
              followingStatus: false,
            };
          }
          return user;
        });
      })

      // Get PP followers
      .addCase(getPPFollowersThunk.pending, (state) => {
        state.PPfollowerListIsLoading = true;
      })
      .addCase(getPPFollowersThunk.fulfilled, (state, payload) => {
        if (payload.payload?.data.payload.length) {
          const firstUserId = payload.payload.data.payload[0]?.id;
          if (firstUserId !== null && firstUserId !== undefined) {
            const followersIds = state.PPfollowersList.map((el) => el.id);
            const res = followersIds.includes(firstUserId);
            if (!res) {
              state.PPfollowersList = [
                ...state.PPfollowersList,
                ...payload.payload.data.payload,
              ];
              state.PPfollowerOffset =
                state.PPfollowerOffset + state.PPfollowerLimit;
            }
          }
        }
        if (payload?.payload?.data?.payload?.length ?? 0 < 1) {
          state.PPfollowerHasMore = false;
        }

        state.PPfollowerListIsLoading = false;
      })
      .addCase(getPPFollowersThunk.rejected, (state) => {
        state.errorMessage = '';
        state.PPfollowerListIsLoading = false;
      })

      // Get PP following
      .addCase(getPPFollowingUsersThunk.pending, (state) => {
        state.PPfollowingListIsLoading = true;
      })
      .addCase(getPPFollowingUsersThunk.fulfilled, (state, payload) => {
        if (payload.payload?.data.payload.length) {
          const firstUserId = payload.payload.data.payload[0]?.id;
          if (firstUserId !== null && firstUserId !== undefined) {
            const followingIds = state.PPfollowingList.map((el) => el.id);
            const res = followingIds.includes(firstUserId);
            if (!res) {
              state.PPfollowingList = [
                ...state.PPfollowingList,
                ...payload.payload.data.payload,
              ];
              state.PPfollowingOffset =
                state.PPfollowingOffset + state.PPfollowingLimit;
            }
          }
        }
        if (payload?.payload?.data?.payload?.length ?? 0 < 1) {
          // this code must be tested !!!!!!!!!!!
          state.PPfollowerHasMore = false;
        }

        state.PPfollowingListIsLoading = false;
      })
      .addCase(getPPFollowingUsersThunk.rejected, (state) => {
        state.errorMessage = '';
        state.PPfollowingListIsLoading = false;
      });
  },
});

export const { resetSearchRespons } = utileSlice.actions;

export default utileSlice.reducer;
