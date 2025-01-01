import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from './config/stripe';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    if (!STRIPE_CONFIG.publicKey) {
      throw new Error('Stripe public key is not configured');
    }
    stripePromise = loadStripe(STRIPE_CONFIG.publicKey);
  }
  return stripePromise;
};
