import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LeagueType, LeaguePricingState } from '../types/league-pricing';

export const useLeaguePricingStore = create<LeaguePricingState>()(
  persist(
    (set) => ({
      prices: {
        business: 6800,
        junior: 500,
        longday: 1500,
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
    }
  )
);