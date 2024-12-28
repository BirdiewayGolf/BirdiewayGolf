import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Participant, CreateParticipant } from '../types/participant';

interface ParticipantState {
  version: number;
  participants: Participant[];
}

interface ParticipantStore extends ParticipantState {
  addParticipant: (participant: CreateParticipant) => void;
  updateParticipant: (id: string, updates: Partial<CreateParticipant>) => void;
  deleteParticipant: (id: string) => void;
  getParticipantsByTournament: (tournamentId: string) => Participant[];
}

const initialState: ParticipantState = {
  version: 1,
  participants: [],
};

export const useParticipantStore = create<ParticipantStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      addParticipant: (participant) => {
        const newParticipant: Participant = {
          ...participant,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          participants: [...state.participants, newParticipant],
        }));
      },
      updateParticipant: (id, updates) => {
        set((state) => ({
          participants: state.participants.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },
      deleteParticipant: (id) => {
        set((state) => ({
          participants: state.participants.filter((p) => p.id !== id),
        }));
      },
      getParticipantsByTournament: (tournamentId) => {
        return get().participants.filter((p) => p.tournamentId === tournamentId);
      },
    }),
    {
      name: 'participant-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);