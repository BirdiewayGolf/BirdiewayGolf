export interface Participant {
  id: string;
  tournamentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParticipant {
  tournamentId: string;
  name: string;
}