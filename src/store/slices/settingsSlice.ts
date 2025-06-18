import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChartSettings {
  showLegend: boolean;
  showGrid: boolean;
  showTooltips: boolean;
  animationEnabled: boolean;
}

interface GeneralSettings {
  refreshInterval: number; // in seconds
  defaultStatView: string;
  autoDarkMode: boolean;
}

interface SettingsState {
  chartSettings: ChartSettings;
  generalSettings: GeneralSettings;
  favoriteTeamId: string | null;
  favoritePlayers: string[];
  userPreferences: Record<string, any>;
}

const initialState: SettingsState = {
  chartSettings: {
    showLegend: true,
    showGrid: true,
    showTooltips: true,
    animationEnabled: true,
  },
  generalSettings: {
    refreshInterval: 60,
    defaultStatView: 'offense',
    autoDarkMode: false,
  },
  favoriteTeamId: null,
  favoritePlayers: [],
  userPreferences: {},
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateChartSettings: (state, action: PayloadAction<Partial<ChartSettings>>) => {
      state.chartSettings = { ...state.chartSettings, ...action.payload };
    },
    updateGeneralSettings: (state, action: PayloadAction<Partial<GeneralSettings>>) => {
      state.generalSettings = { ...state.generalSettings, ...action.payload };
    },
    setFavoriteTeam: (state, action: PayloadAction<string | null>) => {
      state.favoriteTeamId = action.payload;
    },
    addFavoritePlayer: (state, action: PayloadAction<string>) => {
      if (!state.favoritePlayers.includes(action.payload)) {
        state.favoritePlayers.push(action.payload);
      }
    },
    removeFavoritePlayer: (state, action: PayloadAction<string>) => {
      state.favoritePlayers = state.favoritePlayers.filter(id => id !== action.payload);
    },
    setUserPreference: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state.userPreferences[action.payload.key] = action.payload.value;
    },
    resetSettings: (state) => {
      return initialState;
    },
  },
});

export const {
  updateChartSettings,
  updateGeneralSettings,
  setFavoriteTeam,
  addFavoritePlayer,
  removeFavoritePlayer,
  setUserPreference,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;