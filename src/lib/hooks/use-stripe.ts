import { getStripe } from '../services/stripe';
import { STRIPE_CONFIG } from '../config/stripe';
import type { LeagueType } from '../types/league-pricing';
import { useLeaguePricingStore } from '../stores/league-pricing-store';

interface CreateCheckoutOptions {
  leagueType: LeagueType;
  formData?: Record<string, any>;
}

export function useStripe() {
  const createCheckoutSession = async ({ leagueType, formData = {} }: CreateCheckoutOptions) => {
    if (!STRIPE_CONFIG.isConfigured) {
      throw new Error('Stripe is not configured');
    }

    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Failed to initialize Stripe');
    }

    // Get price from league pricing store instead of static PRICES
    const prices = useLeaguePricingStore.getState().prices;
    const price = prices[leagueType];

    if (!price) {
      throw new Error(`No price configured for league type: ${leagueType}`);
    }

    // Return stripe instance and price
    return { stripe, price };
  };

  return {
    createCheckoutSession,
    isConfigured: STRIPE_CONFIG.isConfigured
  };
}