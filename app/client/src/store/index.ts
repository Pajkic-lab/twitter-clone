import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import styleReducer from './features/styleSlice'
import userReducer from './features/userSlice'

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
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
