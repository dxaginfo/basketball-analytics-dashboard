import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { playersApi } from '../../services/api';
import { Player, PlayerStats } from '../../types/player';

interface PlayersState {
  players: Player[];
  playerStats: Record<string, PlayerStats>; // Map player ID to stats
  selectedPlayerId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  playerStats: {},
  selectedPlayerId: null,
  loading: false,
  error: null,
};

export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  // In a real app, this would call the API
  // return await playersApi.getPlayers();
  
  // For this example, we'll return mock data
  return [
    { id: '1', name: 'LeBron James', teamId: '1', position: 'SF', jerseyNumber: '6', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Stephen Curry', teamId: '3', position: 'PG', jerseyNumber: '30', imageUrl: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Kevin Durant', teamId: '4', position: 'SF', jerseyNumber: '7', imageUrl: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Giannis Antetokounmpo', teamId: '5', position: 'PF', jerseyNumber: '34', imageUrl: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Jayson Tatum', teamId: '2', position: 'SF', jerseyNumber: '0', imageUrl: 'https://via.placeholder.com/150' },
    { id: '6', name: 'Luka Doncic', teamId: '7', position: 'PG', jerseyNumber: '77', imageUrl: 'https://via.placeholder.com/150' },
    { id: '7', name: 'Anthony Davis', teamId: '1', position: 'PF', jerseyNumber: '3', imageUrl: 'https://via.placeholder.com/150' },
    { id: '8', name: 'Jimmy Butler', teamId: '8', position: 'SF', jerseyNumber: '22', imageUrl: 'https://via.placeholder.com/150' },
  ];
});

export const fetchPlayerStats = createAsyncThunk(
  'players/fetchPlayerStats',
  async (playerId: string) => {
    // In a real app, this would call the API
    // return await playersApi.getPlayerStats(playerId);
    
    // For this example, we'll return mock data
    return {
      playerId,
      pointsPerGame: Math.floor(Math.random() * 15) + 10,
      reboundsPerGame: Math.floor(Math.random() * 7) + 3,
      assistsPerGame: Math.floor(Math.random() * 6) + 2,
      stealsPerGame: Math.random() * 2,
      blocksPerGame: Math.random() * 2,
      fieldGoalPercentage: (Math.random() * 10 + 40) / 100,
      threePointPercentage: (Math.random() * 10 + 30) / 100,
      freeThrowPercentage: (Math.random() * 10 + 70) / 100,
      minutesPerGame: Math.floor(Math.random() * 15) + 20,
      gamesPlayed: Math.floor(Math.random() * 40) + 40,
      plusMinus: Math.floor(Math.random() * 20) - 10,
    };
  }
);

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setSelectedPlayer: (state, action: PayloadAction<string>) => {
      state.selectedPlayerId = action.payload;
    },
    clearSelectedPlayer: (state) => {
      state.selectedPlayerId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<Player[]>) => {
        state.players = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch players';
      })
      .addCase(fetchPlayerStats.fulfilled, (state, action: PayloadAction<PlayerStats>) => {
        state.playerStats[action.payload.playerId] = action.payload;
      });
  },
});

export const { setSelectedPlayer, clearSelectedPlayer } = playersSlice.actions;

export default playersSlice.reducer;