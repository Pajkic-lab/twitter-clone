import {
  getFollowersThunk,
  getFollowingUsersThunk,
  getMostPopularProfiles,
  getPPFollowersThunk,
  getPPFollowingUsersThunk,
  searchThunk,
} from './thunk';
import { followUserThunk, unFollowUserThunk } from '../authSlice/thunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { User } from 'apps/client/src/types';
// import { User } from 'types'

interface UtileState {
  mostPopularUsers: User[];
  mostPupularUsersIsLoading: boolean;
  searchRespons: User[];
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
  mostPupularUsersIsLoading: false,
  searchRespons: [],
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
      state.searchRespons = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // Most pupular profiles
      .addCase(getMostPopularProfiles.pending, (state) => {
        state.mostPupularUsersIsLoading = true;
      })
      .addCase(
        getMostPopularProfiles.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ mostPupularUsers: [] }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            state.mostPopularUsers = [...payload.data.mostPupularUsers];
          }
          state.mostPupularUsersIsLoading = false;
        }
      )
      .addCase(getMostPopularProfiles.rejected, (state) => {
        state.errorMessage = '';
        state.mostPupularUsersIsLoading = false;
      })

      // Search response
      .addCase(searchThunk.pending, (state) => {
        state.searchIsLoading = true;
      })
      .addCase(
        searchThunk.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ searchRespons: [] }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            state.searchRespons = payload.data.searchRespons;
          }
          state.searchIsLoading = false;
        }
      )
      .addCase(searchThunk.rejected, (state) => {
        state.errorMessage = '';
        state.searchIsLoading = false;
      })

      // Get followers
      .addCase(getFollowersThunk.pending, (state) => {
        state.followerListIsLoading = true;
      })
      .addCase(
        getFollowersThunk.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ followersList: User[] }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            if (
              payload.data.followersList &&
              payload.data.followersList.length
            ) {
              const firstUserId = payload.data.followersList[0]?.id;
              if (firstUserId !== null && firstUserId !== undefined) {
                const followersIds = state.followersList.map((el) => el.id);
                const res = followersIds.includes(firstUserId);
                if (!res) {
                  state.followersList = [
                    ...state.followersList,
                    ...payload.data.followersList,
                  ];
                  state.followerOffset =
                    state.followerOffset + state.followerLimit;
                }
              }
            }
            if (payload.data.followersList.length < 1) {
              state.followerHasMore = false;
            }
          }
          state.followerListIsLoading = false;
        }
      )
      .addCase(getFollowersThunk.rejected, (state) => {
        state.errorMessage = '';
        state.followerListIsLoading = false;
      })

      // Get following
      .addCase(getFollowingUsersThunk.pending, (state) => {
        state.followingListIsLoading = true;
      })
      .addCase(
        getFollowingUsersThunk.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ followingList: User[] }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            if (payload.data.followingList.length) {
              const firstUserId = payload.data.followingList[0]?.id;
              if (firstUserId !== null && firstUserId !== undefined) {
                const followingIds = state.followingList.map((el) => el.id);
                const res = followingIds.includes(firstUserId);
                if (!res) {
                  state.followingList = [
                    ...state.followingList,
                    ...payload.data.followingList,
                  ];
                  state.followingOffset =
                    state.followingOffset + state.followingLimit;
                }
              }
            }
            if (payload.data.followingList.length < 1) {
              state.followingHasMore = false;
            }
          }
          state.followingListIsLoading = false;
        }
      )
      .addCase(getFollowingUsersThunk.rejected, (state) => {
        state.errorMessage = '';
        state.followingListIsLoading = false;
      })

      // Follow user
      .addCase(
        followUserThunk.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ userIdToFollow: number }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            state.followersList = state.followersList.map((user) => {
              if (user.id === payload.data.userIdToFollow) {
                return {
                  ...user,
                  followingStatus: true,
                };
              }
              return user;
            });

            state.followingList = state.followingList.map((user) => {
              if (user.id === payload.data.userIdToFollow) {
                return {
                  ...user,
                  followingStatus: true,
                };
              }
              return user;
            });
          }
        }
      )

      // Unfollow user
      .addCase(
        unFollowUserThunk.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ userIdToUnFollow: number }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            state.followersList = state.followersList.map((user) => {
              if (user.id === payload.data.userIdToUnFollow) {
                return {
                  ...user,
                  followingStatus: false,
                };
              }
              return user;
            });

            state.followingList = state.followingList.map((user) => {
              if (user.id === payload.data.userIdToUnFollow) {
                return {
                  ...user,
                  followingStatus: false,
                };
              }
              return user;
            });
          }
        }
      )

      // Get PP followers
      .addCase(getPPFollowersThunk.pending, (state) => {
        state.PPfollowerListIsLoading = true;
      })
      .addCase(
        getPPFollowersThunk.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ followersList: User[] }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            if (payload.data.followersList.length) {
              const firstUserId = payload.data.followersList[0]?.id;
              if (firstUserId !== null && firstUserId !== undefined) {
                const followersIds = state.PPfollowersList.map((el) => el.id);
                const res = followersIds.includes(firstUserId);
                if (!res) {
                  state.PPfollowersList = [
                    ...state.PPfollowersList,
                    ...payload.data.followersList,
                  ];
                  state.PPfollowerOffset =
                    state.PPfollowerOffset + state.PPfollowerLimit;
                }
              }
            }
            if (payload.data.followersList.length < 1) {
              state.PPfollowerHasMore = false;
            }
          }
          state.PPfollowerListIsLoading = false;
        }
      )
      .addCase(getPPFollowersThunk.rejected, (state) => {
        state.errorMessage = '';
        state.PPfollowerListIsLoading = false;
      })

      // Get PP following
      .addCase(getPPFollowingUsersThunk.pending, (state) => {
        state.PPfollowingListIsLoading = true;
      })
      .addCase(
        getPPFollowingUsersThunk.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            AxiosResponse<{ followingList: User[] }, any> | undefined
          >
        ) => {
          if (payload && payload.data) {
            if (payload.data.followingList.length) {
              const firstUserId = payload.data.followingList[0]?.id;
              if (firstUserId !== null && firstUserId !== undefined) {
                const followingIds = state.PPfollowingList.map((el) => el.id);
                const res = followingIds.includes(firstUserId);
                if (!res) {
                  state.PPfollowingList = [
                    ...state.PPfollowingList,
                    ...payload.data.followingList,
                  ];
                  state.PPfollowingOffset =
                    state.PPfollowingOffset + state.PPfollowingLimit;
                }
              }
            }
            if (payload.data.followingList.length < 1) {
              state.PPfollowingHasMore = false;
            }
          }
          state.PPfollowingListIsLoading = false;
        }
      )
      .addCase(getPPFollowingUsersThunk.rejected, (state) => {
        state.errorMessage = '';
        state.PPfollowingListIsLoading = false;
      });
  },
});

export const { resetSearchRespons } = utileSlice.actions;

export default utileSlice.reducer;
