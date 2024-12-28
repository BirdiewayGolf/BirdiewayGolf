export type LeagueType = 'business' | 'junior';

export interface StandingsEntry {
  id: string;
  leagueType: LeagueType;
  teamName: string;
  playerNames: string;
  totalPoints: number;
  scoringAverage: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStandingsEntry {
  leagueType: LeagueType;
  teamName: string;
  playerNames: string;
  totalPoints: number;
  scoringAverage: number;
}