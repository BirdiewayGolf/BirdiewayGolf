// /src/lib/types/league-pricing.ts

export type LeagueType = 'business' | 'junior' | 'longday';

export interface LeaguePricing {
  business: number;
  junior: number;
  longday: number;
}

export interface LeaguePricingState {
  prices: LeaguePricing;
  updatePrice: (league: LeagueType, price: number) => void;
}
