import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import publicProfileReducer from './features/publicProfileSlice'
import styleReducer from './features/styleSlice'
import authReducer from './features/authSlice'
import utileReducer from './features/utileSlice'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const store = configureStore({
  reducer: {
    style: styleReducer,
    auth: authReducer,
    publicProfile: publicProfileReducer,
    utile: utileReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
