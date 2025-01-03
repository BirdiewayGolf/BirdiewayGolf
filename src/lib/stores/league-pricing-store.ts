import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LeagueType, LeaguePricingState } from '../types/league-pricing';

export const useLeaguePricingStore = create<LeaguePricingState>()(
  persist(
    (set) => ({
      prices: {
        business: 680000,  // $6,800 in cents
        junior: 50000,     // $500 in cents
        longday: 150000,   // $1,500 in cents
      },
      updatePrice: (league: LeagueType, price: number) =>
        set((state) => ({
          prices: {
            ...state.prices,
            [league]: price,
          },
        })),
    }),
    {
      name: 'league-pricing-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            prices: {
              business: persistedState.prices?.business ?? 680000,
              junior: persistedState.prices?.junior ?? 50000,
              longday: persistedState.prices?.longday ?? 150000,
            },
            updatePrice: persistedState.updatePrice,
          };
        }
        return persistedState;
      },
    }
  )
);