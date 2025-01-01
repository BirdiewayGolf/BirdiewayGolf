export interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  courseType: '9hole' | '18hole';
  coursePar: number;
  type: TournamentType;
  leaderboard?: LeaderboardEntry[];
  pairings?: TournamentPairing[];
  participants?: Participant[];
}

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  score: number;
  position?: number;
}

export interface TournamentPairing {
  id: string;
  time: string;
  players: string[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type TournamentType = 'business' | 'junior' | 'longday';
