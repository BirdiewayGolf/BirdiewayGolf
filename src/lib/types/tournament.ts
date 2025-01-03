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
  pairings: TournamentPairing[];
  participants?: Participant[];
  
  // New properties for visibility and tracking
  isVisible?: boolean;
  createdAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  playerId: string;
  playerName: string;
  score: number;
  position?: number;
  relativeToPar?: number;
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
  tournamentId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TournamentType = 'business' | 'junior' | 'longday';