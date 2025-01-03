// src/config/stripe.ts

// Import types and ensure environmental type safety
interface StripeConfig {
  publicKey: string | undefined;
  isConfigured: boolean;
}

interface LeaguePricing {
  readonly [key: string]: number;
  readonly business: number;
  readonly junior: number;
  readonly longday: number;
}

// Stripe configuration with proper type checking
export const STRIPE_CONFIG: StripeConfig = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  isConfigured: Boolean(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
} as const;

// League pricing configuration with proper typing and documentation
export const PRICES: LeaguePricing = {
  business: 680000, // $6,800 in cents
  junior: 50000,   // $500 in cents
  longday: 150000  // $1,500 in cents
} as const;

// Validation utility to ensure prices are properly formatted for Stripe
export const validatePrice = (price: number): boolean => {
  return Number.isInteger(price) && price > 0;
};

// Helper function to format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price / 100);
};

// Helper to get price in dollars (for display purposes)
export const getPriceInDollars = (price: number): number => {
  return price / 100;
};