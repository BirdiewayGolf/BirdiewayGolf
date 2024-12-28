export type TournamentType = 'business' | 'junior' | 'longday';
export type CourseType = '9hole' | '18hole';

export interface Tournament {
  id: string;
  name: string;
  type: TournamentType;
  date: string;
  location: string;
  description: string;
  courseType: CourseType;
  coursePar: number;
  pairings: TournamentPairing[];
}

export interface TournamentPairing {
  id: string;
  groupNumber: number;
  players: string[];
  teeTime: string;
  startingHole: number;
}