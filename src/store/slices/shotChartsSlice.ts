import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { shotChartsApi } from '../../services/api';
import { ShotChart, ShotLocation } from '../../types/shotChart';

interface ShotChartsState {
  playerShotCharts: Record<string, ShotChart>; // Map player ID to shot chart
  teamShotCharts: Record<string, ShotChart>; // Map team ID to shot chart
  loading: boolean;
  error: string | null;
}

const initialState: ShotChartsState = {
  playerShotCharts: {},
  teamShotCharts: {},
  loading: false,
  error: null,
};

export const fetchPlayerShotChart = createAsyncThunk(
  'shotCharts/fetchPlayerShotChart',
  async ({ playerId, seasonType = 'Regular Season' }: { playerId: string; seasonType?: string }) => {
    // In a real app, this would call the API
    // return await shotChartsApi.getPlayerShotChart(playerId, seasonType);
    
    // For this example, we'll generate random shot data
    const generateRandomShots = (made: boolean, count: number): ShotLocation[] => {
      const shots = [];
      for (let i = 0; i < count; i++) {
        // Random coordinates on the half court
        // x: -250 to 250, y: 0 to 470
        const x = Math.floor(Math.random() * 500) - 250;
        const y = Math.floor(Math.random() * 470);
        
        // Calculate zone and distance
        const distance = Math.sqrt(x * x + y * y) / 10;
        let zone = 'Mid-Range';
        let pointValue = 2;
        
        if (distance < 8) {
          zone = 'Restricted Area';
        } else if (distance > 23.75 && y > 0) {
          zone = '3PT';
          pointValue = 3;
        }
        
        shots.push({
          x,
          y,
          made,
          distance,
          zone,
          pointValue,
          gameId: `game${Math.floor(Math.random() * 10) + 1}`,
          periodNumber: Math.floor(Math.random() * 4) + 1,
          minutesRemaining: Math.floor(Math.random() * 12),
          secondsRemaining: Math.floor(Math.random() * 60),
        });
      }
      return shots;
    };
    
    // Generate random made and missed shots
    const madeCount = Math.floor(Math.random() * 100) + 200;
    const missedCount = Math.floor(Math.random() * 100) + 250;
    
    return {
      playerId,
      seasonType,
      shots: [
        ...generateRandomShots(true, madeCount),
        ...generateRandomShots(false, missedCount),
      ],
    };
  }
);

export const fetchTeamShotChart = createAsyncThunk(
  'shotCharts/fetchTeamShotChart',
  async ({ teamId, seasonType = 'Regular Season' }: { teamId: string; seasonType?: string }) => {
    // In a real app, this would call the API
    // return await shotChartsApi.getTeamShotChart(teamId, seasonType);
    
    // Reuse the same logic from player shot charts but with team ID
    const generateRandomShots = (made: boolean, count: number): ShotLocation[] => {
      const shots = [];
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 500) - 250;
        const y = Math.floor(Math.random() * 470);
        const distance = Math.sqrt(x * x + y * y) / 10;
        let zone = 'Mid-Range';
        let pointValue = 2;
        
        if (distance < 8) {
          zone = 'Restricted Area';
        } else if (distance > 23.75 && y > 0) {
          zone = '3PT';
          pointValue = 3;
        }
        
        shots.push({
          x,
          y,
          made,
          distance,
          zone,
          pointValue,
          gameId: `game${Math.floor(Math.random() * 10) + 1}`,
          periodNumber: Math.floor(Math.random() * 4) + 1,
          minutesRemaining: Math.floor(Math.random() * 12),
          secondsRemaining: Math.floor(Math.random() * 60),
        });
      }
      return shots;
    };
    
    const madeCount = Math.floor(Math.random() * 300) + 700;
    const missedCount = Math.floor(Math.random() * 300) + 800;
    
    return {
      teamId,
      seasonType,
      shots: [
        ...generateRandomShots(true, madeCount),
        ...generateRandomShots(false, missedCount),
      ],
    };
  }
);

const shotChartsSlice = createSlice({
  name: 'shotCharts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayerShotChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayerShotChart.fulfilled, (state, action: PayloadAction<ShotChart>) => {
        state.playerShotCharts[action.payload.playerId] = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlayerShotChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch player shot chart';
      })
      .addCase(fetchTeamShotChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamShotChart.fulfilled, (state, action: PayloadAction<ShotChart>) => {
        state.teamShotCharts[action.payload.teamId] = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeamShotChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch team shot chart';
      });
  },
});

export default shotChartsSlice.reducer;