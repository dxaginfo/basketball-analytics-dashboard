import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { teamsApi } from '../../services/api';
import { Team, TeamStats } from '../../types/team';

interface TeamsState {
  teams: Team[];
  teamStats: Record<string, TeamStats>; // Map team ID to stats
  selectedTeamId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  teamStats: {},
  selectedTeamId: null,
  loading: false,
  error: null,
};

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
  // In a real app, this would call the API
  // return await teamsApi.getTeams();
  
  // For this example, we'll return mock data
  return [
    { id: '1', name: 'Los Angeles Lakers', abbreviation: 'LAL', primaryColor: '#552583', secondaryColor: '#FDB927' },
    { id: '2', name: 'Boston Celtics', abbreviation: 'BOS', primaryColor: '#007A33', secondaryColor: '#BA9653' },
    { id: '3', name: 'Golden State Warriors', abbreviation: 'GSW', primaryColor: '#1D428A', secondaryColor: '#FFC72C' },
    { id: '4', name: 'Brooklyn Nets', abbreviation: 'BKN', primaryColor: '#000000', secondaryColor: '#FFFFFF' },
    { id: '5', name: 'Milwaukee Bucks', abbreviation: 'MIL', primaryColor: '#00471B', secondaryColor: '#EEE1C6' },
    { id: '6', name: 'Phoenix Suns', abbreviation: 'PHX', primaryColor: '#1D1160', secondaryColor: '#E56020' },
    { id: '7', name: 'Dallas Mavericks', abbreviation: 'DAL', primaryColor: '#0053BC', secondaryColor: '#00285E' },
    { id: '8', name: 'Miami Heat', abbreviation: 'MIA', primaryColor: '#98002E', secondaryColor: '#F9A01B' },
  ];
});

export const fetchTeamStats = createAsyncThunk(
  'teams/fetchTeamStats',
  async (teamId: string) => {
    // In a real app, this would call the API
    // return await teamsApi.getTeamStats(teamId);
    
    // For this example, we'll return mock data
    return {
      teamId,
      wins: Math.floor(Math.random() * 50) + 20,
      losses: Math.floor(Math.random() * 30) + 10,
      pointsPerGame: Math.floor(Math.random() * 20) + 100,
      reboundsPerGame: Math.floor(Math.random() * 10) + 40,
      assistsPerGame: Math.floor(Math.random() * 10) + 20,
      fieldGoalPercentage: (Math.random() * 10 + 40) / 100,
      threePointPercentage: (Math.random() * 10 + 30) / 100,
      freeThrowPercentage: (Math.random() * 10 + 70) / 100,
      offensiveRating: Math.floor(Math.random() * 20) + 100,
      defensiveRating: Math.floor(Math.random() * 20) + 100,
    };
  }
);

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setSelectedTeam: (state, action: PayloadAction<string>) => {
      state.selectedTeamId = action.payload;
    },
    clearSelectedTeam: (state) => {
      state.selectedTeamId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teams';
      })
      .addCase(fetchTeamStats.fulfilled, (state, action: PayloadAction<TeamStats>) => {
        state.teamStats[action.payload.teamId] = action.payload;
      });
  },
});

export const { setSelectedTeam, clearSelectedTeam } = teamsSlice.actions;

export default teamsSlice.reducer;