import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StandingsEntry, CreateStandingsEntry, LeagueType } from '../types/standings';

interface StandingsState {
  version: number;
  standings: StandingsEntry[];
}

interface StandingsStore extends StandingsState {
  addEntry: (entry: CreateStandingsEntry) => void;
  updateEntry: (id: string, entry: Partial<CreateStandingsEntry>) => void;
  deleteEntry: (id: string) => void;
  getStandingsByLeague: (leagueType: LeagueType) => StandingsEntry[];
}

const initialState: StandingsState = {
  version: 1,
  standings: [],
};

export const useStandingsStore = create<StandingsStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      addEntry: (entry) => {
        const newEntry: StandingsEntry = {
          ...entry,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          standings: [...state.standings, newEntry],
        }));
      },
      updateEntry: (id, updates) => {
        set((state) => ({
          standings: state.standings.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : entry
          ),
        }));
      },
      deleteEntry: (id) => {
        set((state) => ({
          standings: state.standings.filter((entry) => entry.id !== id),
        }));
      },
      getStandingsByLeague: (leagueType) => {
        return get().standings
          .filter((entry) => entry.leagueType === leagueType)
          .sort((a, b) => b.totalPoints - a.totalPoints);
      },
    }),
    {
      name: 'standings-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration from version 0 to 1
          return {
            ...initialState,
            standings: persistedState.standings || [],
          };
        }
        return persistedState as StandingsState;
      },
    }
  )
);