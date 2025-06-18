export interface Player {
  id: string;
  name: string;
  teamId: string;
  position: string;
  jerseyNumber: string;
  imageUrl?: string;
  height?: string;
  weight?: string;
  birthdate?: string;
  country?: string;
  draftYear?: number;
  experience?: number;
}

export interface PlayerStats {
  playerId: string;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  minutesPerGame: number;
  gamesPlayed: number;
  plusMinus: number;
  turnoversPerGame?: number;
  personalFoulsPerGame?: number;
  offensiveReboundsPerGame?: number;
  defensiveReboundsPerGame?: number;
  effectiveFieldGoalPercentage?: number;
  trueShootingPercentage?: number;
  usagePercentage?: number;
  playerEfficiencyRating?: number;
  valueOverReplacement?: number;
}

export interface PlayerGameStats extends PlayerStats {
  gameId: string;
  date: string;
  opponent: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personalFouls: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointersMade: number;
  threePointersAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  plusMinus: number;
}