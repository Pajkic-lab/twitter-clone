import {
  getPublicProfile,
  resetState,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const PublicProfileTrigger: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { errorMessage } = useAppSelector((state) => state.publicProfile);
  const publicProfileId = useAppSelector((state) => state.publicProfile.id);

  const { id } = useAppSelector((state) => state.auth);

  let paramsId: number;

  if (params.id) {
    paramsId = parseInt(params.id);
  }

  useEffect(() => {
    if (paramsId === id || typeof paramsId !== 'number') {
      navigate('/');
    }
    if (errorMessage === 'no existing user') {
      navigate('/');
    }
    if (paramsId && publicProfileId !== paramsId) {
      dispatch(resetState());
      void dispatch(getPublicProfile(paramsId));
    }
  }, [errorMessage, params.id]);

  return null;
};
