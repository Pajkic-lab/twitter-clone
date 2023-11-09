import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getPPFollowersThunk,
  getPPFollowingUsersThunk,
} from '../store/features/utileSlice/thunk';
// import { getPPFollowersThunk, getPPFollowingUsersThunk } from 'store/features/utileSlice/thunk'
// import { useAppDispatch, useAppSelector } from 'store/hooks'

export const PublicProfileConnectiosTrigger = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userId = parseInt(id!);

  const {
    PPfollowerOffset,
    PPfollowerLimit,
    PPfollowingOffset,
    PPfollowingLimit,
  } = useAppSelector((state) => state.utile);

  useEffect(() => {
    const getFollowersHelper = async () => {
      if (!PPfollowerOffset) {
        await dispatch(
          getPPFollowersThunk({ userId, PPfollowerOffset, PPfollowerLimit })
        );
      }

      if (!PPfollowingOffset) {
        await dispatch(
          getPPFollowingUsersThunk({
            userId,
            PPfollowingOffset,
            PPfollowingLimit,
          })
        );
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getFollowersHelper();
  }, [userId]);

  return null;
};
