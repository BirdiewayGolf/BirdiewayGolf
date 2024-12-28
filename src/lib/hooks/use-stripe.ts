import { getStripe } from '../services/stripe';
import { STRIPE_CONFIG, PRICES } from '../config/stripe';
import type { LeagueType } from '../types/league-pricing';

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

    const price = PRICES[leagueType];
    return { stripe, price };
  };

  return {
    createCheckoutSession,
    isConfigured: STRIPE_CONFIG.isConfigured
  };
}