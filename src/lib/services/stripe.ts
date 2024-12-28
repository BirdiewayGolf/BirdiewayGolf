import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../config/stripe';

let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise && STRIPE_CONFIG.isConfigured) {
    stripePromise = loadStripe(STRIPE_CONFIG.publicKey);
  }
  return stripePromise;
};