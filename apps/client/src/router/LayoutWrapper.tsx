import { Loader } from '@tw/ui/components';
import { useAppSelector } from '@tw/ui/data-access';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AccessType } from '../types';

export const LayoutWrapper: React.FC<{
  accessType: AccessType;
  children: JSX.Element;
}> = ({ accessType, children }) => {
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);
  const publicProfileIsLoading = useAppSelector(
    (state) => state.publicProfile.isLoading
  );

  const pageIsLoading = isLoading || publicProfileIsLoading;

  return (accessType === 'private' && !isAuth) ||
    (accessType === 'guest' && isAuth) ? (
    <Navigate to={accessType === 'private' ? '/' : '/home'} replace />
  ) : pageIsLoading ? (
    <Loader fullScreen={true} />
  ) : (
    children
  );
};
