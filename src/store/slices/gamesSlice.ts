import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { gamesApi } from '../../services/api';
import { Game, GameDetails } from '../../types/game';

interface GamesState {
  games: Game[];
  gameDetails: Record<string, GameDetails>; // Map game ID to details
  selectedGameId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  gameDetails: {},
  selectedGameId: null,
  loading: false,
  error: null,
};

export const fetchRecentGames = createAsyncThunk('games/fetchRecentGames', async () => {
  // In a real app, this would call the API
  // return await gamesApi.getRecentGames();
  
  // For this example, we'll return mock data
  return [
    { id: '1', homeTeamId: '1', awayTeamId: '2', homeScore: 112, awayScore: 108, date: '2025-06-15T20:00:00Z', status: 'FINAL' },
    { id: '2', homeTeamId: '3', awayTeamId: '4', homeScore: 121, awayScore: 116, date: '2025-06-15T19:30:00Z', status: 'FINAL' },
    { id: '3', homeTeamId: '5', awayTeamId: '6', homeScore: 98, awayScore: 105, date: '2025-06-16T18:00:00Z', status: 'FINAL' },
    { id: '4', homeTeamId: '7', awayTeamId: '8', homeScore: 110, awayScore: 104, date: '2025-06-16T20:30:00Z', status: 'FINAL' },
    { id: '5', homeTeamId: '2', awayTeamId: '3', homeScore: 95, awayScore: 98, date: '2025-06-17T19:00:00Z', status: 'FINAL' },
    { id: '6', homeTeamId: '1', awayTeamId: '5', homeScore: 117, awayScore: 109, date: '2025-06-18T20:00:00Z', status: 'FINAL' },
  ];
});

export const fetchGameDetails = createAsyncThunk(
  'games/fetchGameDetails',
  async (gameId: string) => {
    // In a real app, this would call the API
    // return await gamesApi.getGameDetails(gameId);
    
    // For this example, we'll return mock data with random quarter scores
    const createQuarterScores = () => {
      const quarters = [];
      for (let i = 0; i < 4; i++) {
        quarters.push(Math.floor(Math.random() * 15) + 20);
      }
      return quarters;
    };
    
    return {
      gameId,
      homeTeamQuarterScores: createQuarterScores(),
      awayTeamQuarterScores: createQuarterScores(),
      homeTeamStats: {
        fieldGoalsMade: Math.floor(Math.random() * 15) + 35,
        fieldGoalsAttempted: Math.floor(Math.random() * 15) + 75,
        threePointersMade: Math.floor(Math.random() * 8) + 10,
        threePointersAttempted: Math.floor(Math.random() * 10) + 25,
        freeThrowsMade: Math.floor(Math.random() * 10) + 15,
        freeThrowsAttempted: Math.floor(Math.random() * 8) + 20,
        rebounds: Math.floor(Math.random() * 10) + 40,
        assists: Math.floor(Math.random() * 10) + 20,
        steals: Math.floor(Math.random() * 5) + 5,
        blocks: Math.floor(Math.random() * 5) + 3,
        turnovers: Math.floor(Math.random() * 5) + 8,
        personalFouls: Math.floor(Math.random() * 5) + 15,
      },
      awayTeamStats: {
        fieldGoalsMade: Math.floor(Math.random() * 15) + 35,
        fieldGoalsAttempted: Math.floor(Math.random() * 15) + 75,
        threePointersMade: Math.floor(Math.random() * 8) + 10,
        threePointersAttempted: Math.floor(Math.random() * 10) + 25,
        freeThrowsMade: Math.floor(Math.random() * 10) + 15,
        freeThrowsAttempted: Math.floor(Math.random() * 8) + 20,
        rebounds: Math.floor(Math.random() * 10) + 40,
        assists: Math.floor(Math.random() * 10) + 20,
        steals: Math.floor(Math.random() * 5) + 5,
        blocks: Math.floor(Math.random() * 5) + 3,
        turnovers: Math.floor(Math.random() * 5) + 8,
        personalFouls: Math.floor(Math.random() * 5) + 15,
      },
      topPerformers: [
        { playerId: '1', points: 32, rebounds: 8, assists: 11 },
        { playerId: '5', points: 28, rebounds: 9, assists: 4 },
        { playerId: '7', points: 24, rebounds: 12, assists: 3 },
      ],
      leadChanges: Math.floor(Math.random() * 10) + 5,
      timesTied: Math.floor(Math.random() * 8) + 4,
      largestLead: Math.floor(Math.random() * 10) + 10,
    };
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSelectedGame: (state, action: PayloadAction<string>) => {
      state.selectedGameId = action.payload;
    },
    clearSelectedGame: (state) => {
      state.selectedGameId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
        state.games = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecentGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch games';
      })
      .addCase(fetchGameDetails.fulfilled, (state, action: PayloadAction<GameDetails>) => {
        state.gameDetails[action.payload.gameId] = action.payload;
      });
  },
});

export const { setSelectedGame, clearSelectedGame } = gamesSlice.actions;

export default gamesSlice.reducer;