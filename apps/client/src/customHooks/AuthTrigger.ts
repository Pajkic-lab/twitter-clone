import {
  authUserThunk,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import React, { useEffect } from 'react';

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
