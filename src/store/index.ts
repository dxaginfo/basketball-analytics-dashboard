import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './slices/teamsSlice';
import playersReducer from './slices/playersSlice';
import gamesReducer from './slices/gamesSlice';
import shotChartsReducer from './slices/shotChartsSlice';
import uiReducer from './slices/uiSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    players: playersReducer,
    games: gamesReducer,
    shotCharts: shotChartsReducer,
    ui: uiReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;