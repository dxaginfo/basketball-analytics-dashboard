export interface ShotLocation {
  x: number;
  y: number;
  made: boolean;
  distance: number;
  zone: string;
  pointValue: number;
  gameId: string;
  periodNumber: number;
  minutesRemaining: number;
  secondsRemaining: number;
}

export interface ShotChart {
  playerId?: string;
  teamId?: string;
  seasonType: string;
  shots: ShotLocation[];
}

export interface ZoneEfficiency {
  zone: string;
  attempts: number;
  made: number;
  percentage: number;
  points: number;
  pointsPerShot: number;
}

export interface ShotDistanceEfficiency {
  distance: string;
  attempts: number;
  made: number;
  percentage: number;
}