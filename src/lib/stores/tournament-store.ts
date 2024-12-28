import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tournament, TournamentType, TournamentPairing } from '@/lib/types/tournament';

interface TournamentState {
  version: number;
  tournaments: Tournament[];
  addTournament: (tournament: Omit<Tournament, 'id' | 'pairings'>) => void;
  updateTournament: (id: string, updates: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  getTournamentsByType: (type: TournamentType) => Tournament[];
  getTournamentById: (id: string) => Tournament | undefined;
  addPairing: (tournamentId: string, pairing: Omit<TournamentPairing, 'id'>) => void;
  updatePairing: (tournamentId: string, pairingId: string, updates: Partial<TournamentPairing>) => void;
  deletePairing: (tournamentId: string, pairingId: string) => void;
}

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      version: 1,
      tournaments: [],
      addTournament: (tournament) => {
        const newTournament: Tournament = {
          ...tournament,
          id: crypto.randomUUID(),
          pairings: [],
        };
        set((state) => ({
          tournaments: [...state.tournaments, newTournament],
        }));
      },
      updateTournament: (id, updates) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },
      deleteTournament: (id) => {
        set((state) => ({
          tournaments: state.tournaments.filter((t) => t.id !== id),
        }));
      },
      getTournamentsByType: (type) => {
        return get().tournaments.filter((t) => t.type === type);
      },
      getTournamentById: (id) => {
        return get().tournaments.find((t) => t.id === id);
      },
      addPairing: (tournamentId, pairing) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === tournamentId
              ? {
                  ...t,
                  pairings: [
                    ...t.pairings,
                    { ...pairing, id: crypto.randomUUID() },
                  ],
                }
              : t
          ),
        }));
      },
      updatePairing: (tournamentId, pairingId, updates) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === tournamentId
              ? {
                  ...t,
                  pairings: t.pairings.map((p) =>
                    p.id === pairingId ? { ...p, ...updates } : p
                  ),
                }
              : t
          ),
        }));
      },
      deletePairing: (tournamentId, pairingId) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === tournamentId
              ? {
                  ...t,
                  pairings: t.pairings.filter((p) => p.id !== pairingId),
                }
              : t
          ),
        }));
      },
    }),
    {
      name: 'tournament-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            version: 1,
            tournaments: persistedState.tournaments || [],
          };
        }
        return persistedState as TournamentState;
      },
    }
  )
);