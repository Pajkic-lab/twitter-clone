import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { experimentalSlice } from './features/experimentalSlice';
import publicProfileReducer from './features/publicProfileSlice';
import styleReducer from './features/styleSlice';
import utileReducer from './features/utileSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    style: styleReducer,
    auth: authReducer,
    publicProfile: publicProfileReducer,
    utile: utileReducer,
    [experimentalSlice.reducerPath]: experimentalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(experimentalSlice.middleware),
});
