export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
}

export interface TeamStats {
  teamId: string;
  wins: number;
  losses: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  offensiveRating: number;
  defensiveRating: number;
  netRating?: number;
  pace?: number;
  trueShootingPercentage?: number;
  assistPercentage?: number;
  reboundPercentage?: number;
  turnoverPercentage?: number;
  effectiveFieldGoalPercentage?: number;
}