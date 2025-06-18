export interface Game {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  date: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINAL' | 'POSTPONED' | 'CANCELLED';
  arena?: string;
  city?: string;
  period?: number;
  timeRemaining?: string;
}

export interface TeamGameStats {
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointersMade: number;
  threePointersAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personalFouls: number;
  offensiveRebounds?: number;
  defensiveRebounds?: number;
  fastBreakPoints?: number;
  pointsInPaint?: number;
  secondChancePoints?: number;
  pointsOffTurnovers?: number;
}

export interface PlayerPerformance {
  playerId: string;
  points: number;
  rebounds: number;
  assists: number;
  steals?: number;
  blocks?: number;
  minutesPlayed?: string;
}

export interface GameDetails {
  gameId: string;
  homeTeamQuarterScores: number[];
  awayTeamQuarterScores: number[];
  homeTeamStats: TeamGameStats;
  awayTeamStats: TeamGameStats;
  topPerformers: PlayerPerformance[];
  leadChanges: number;
  timesTied: number;
  largestLead: number;
  homeTeamPlayerStats?: any[];
  awayTeamPlayerStats?: any[];
}