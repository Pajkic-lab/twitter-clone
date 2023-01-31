import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import styleReducer from './features/styleSlice'
import authReducer from './features/authSlice'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const store = configureStore({
  reducer: {
    style: styleReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
