import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authUserThunk } from '../store/features/authSlice/thunk';

export const AuthTrigger: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      void dispatch(authUserThunk());
    }
  }, [isAuth]);

  return null;
};
