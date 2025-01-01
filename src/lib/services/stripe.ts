import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../config/stripe';
import { RegistrationData } from '../types/registration';

// Define the StripeCheckoutResponse interface
interface StripeCheckoutResponse {
  id: string;
  // Add other properties if needed
}

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise && STRIPE_CONFIG.isConfigured && STRIPE_CONFIG.publicKey) {
    stripePromise = loadStripe(STRIPE_CONFIG.publicKey);
  }
  return stripePromise;
};

export const createCheckoutSession = async (data: RegistrationData): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3000/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to create checkout session');
    }

    const checkoutData = responseData as StripeCheckoutResponse;
    
    if (!checkoutData.id) {
      throw new Error('Invalid checkout session');
    }

    return checkoutData.id;
  } catch (error) {
    console.error('Stripe service error:', error);
    throw error;
  }
};
