import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from './config/stripe';

let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    if (!STRIPE_PUBLIC_KEY) {
      throw new Error('Stripe public key is not configured');
    }
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};