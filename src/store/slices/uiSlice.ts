import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TimeRange = 'season' | 'last10' | 'last20' | 'month' | 'custom';
type StatCategory = 'offense' | 'defense' | 'advanced' | 'shotChart';

interface UiState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  timeRange: TimeRange;
  statCategory: StatCategory;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  comparisonMode: boolean;
  comparisonIds: string[];
  darkMode: boolean;
}

const initialState: UiState = {
  sidebarOpen: true,
  mobileMenuOpen: false,
  timeRange: 'season',
  statCategory: 'offense',
  dateRange: {
    startDate: null,
    endDate: null,
  },
  comparisonMode: false,
  comparisonIds: [],
  darkMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    setTimeRange: (state, action: PayloadAction<TimeRange>) => {
      state.timeRange = action.payload;
    },
    setStatCategory: (state, action: PayloadAction<StatCategory>) => {
      state.statCategory = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.dateRange = action.payload;
    },
    toggleComparisonMode: (state) => {
      state.comparisonMode = !state.comparisonMode;
      if (!state.comparisonMode) {
        state.comparisonIds = [];
      }
    },
    addComparisonId: (state, action: PayloadAction<string>) => {
      if (!state.comparisonIds.includes(action.payload)) {
        state.comparisonIds.push(action.payload);
      }
    },
    removeComparisonId: (state, action: PayloadAction<string>) => {
      state.comparisonIds = state.comparisonIds.filter(id => id !== action.payload);
    },
    clearComparisonIds: (state) => {
      state.comparisonIds = [];
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  toggleSidebar,
  toggleMobileMenu,
  closeMobileMenu,
  setTimeRange,
  setStatCategory,
  setDateRange,
  toggleComparisonMode,
  addComparisonId,
  removeComparisonId,
  clearComparisonIds,
  toggleDarkMode,
} = uiSlice.actions;

export default uiSlice.reducer;