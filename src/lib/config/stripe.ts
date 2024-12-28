// Price configuration in cents
export const PRICES = {
  business: 6800, // $6,800
  junior: 500,    // $500
  longday: 1200,  // $1,200
} as const;

// Environment variables
export const STRIPE_CONFIG = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  isConfigured: Boolean(import.meta.env.VITE_STRIPE_PUBLIC_KEY),
} as const;