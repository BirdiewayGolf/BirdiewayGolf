import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tournament, TournamentType, TournamentPairing } from '@/lib/types/tournament';

interface TournamentState {
  version: number;
  tournaments: Tournament[];
  addTournament: (tournament: Omit<Tournament, 'id' | 'pairings' | 'createdAt' | 'isVisible'>) => void;
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
      version: 2, // Incremented version to trigger migration
      tournaments: [],
      
      addTournament: (tournament) => {
        const newTournament: Tournament = {
          ...tournament,
          id: crypto.randomUUID(),
          pairings: [],
          leaderboard: [], // Ensure leaderboard is initialized
          participants: [], // Ensure participants is initialized
          isVisible: true, // Default to visible
          createdAt: new Date().toISOString(), // Add creation timestamp
        };
        
        set((state) => ({
          tournaments: [...state.tournaments, newTournament],
        }));
      },
      
      updateTournament: (id, updates) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === id 
              ? { 
                  ...t, 
                  ...updates,
                  // Ensure isVisible is not accidentally removed
                  isVisible: updates.isVisible ?? t.isVisible ?? true,
                  // Preserve creation timestamp
                  createdAt: t.createdAt || new Date().toISOString()
                } 
              : t
          ),
        }));
      },
      
      deleteTournament: (id) => {
        set((state) => ({
          tournaments: state.tournaments.filter((t) => t.id !== id),
        }));
      },
      
      getTournamentsByType: (type) => {
        return get().tournaments
          .filter((t) => 
            t.type === type && 
            (t.isVisible ?? true) // Only return visible tournaments
          )
          .sort((a, b) => 
            // Sort by date, with upcoming tournaments first
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
      },
      
      getTournamentById: (id) => {
        return get().tournaments.find((t) => 
          t.id === id && (t.isVisible ?? true)
        );
      },
      
      addPairing: (tournamentId, pairing) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === tournamentId
              ? {
                  ...t,
                  pairings: [...(t.pairings || []), { 
                    ...pairing, 
                    id: crypto.randomUUID() 
                  }],
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
                  pairings: (t.pairings || []).map((p) =>
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
                  pairings: (t.pairings || []).filter((p) => p.id !== pairingId),
                }
              : t
          ),
        }));
      },
    }),
    {
      name: 'tournament-storage',
      version: 2, // Incremented to trigger migration
      migrate: (persistedState: any, version: number) => {
        // Migration logic to ensure compatibility
        if (version < 2) {
          return {
            version: 2,
            tournaments: (persistedState.tournaments || []).map((tournament: any) => ({
              ...tournament,
              isVisible: tournament.isVisible ?? true,
              createdAt: tournament.createdAt || new Date().toISOString(),
              pairings: tournament.pairings || [],
              leaderboard: tournament.leaderboard || [],
              participants: tournament.participants || [],
            })),
          };
        }
        return persistedState;
      },
    }
  )
);