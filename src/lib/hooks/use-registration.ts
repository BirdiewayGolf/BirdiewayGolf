import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeaguePricingStore } from '../stores/league-pricing-store';
import type { LeagueType } from '../types/league-pricing';

export function useRegistration(leagueType: LeagueType) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const prices = useLeaguePricingStore((state) => state.prices);

  const handleRegistration = async (formData: any) => {
    try {
      setIsSubmitting(true);
      
      // Updated to use the correct API endpoint
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leagueType,
          price: prices[leagueType],
          formData
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to create checkout session');
      }

      const data = await response.json();

      // Check for both session ID and URL
      if (!data.id && !data.url) {
        throw new Error('Invalid checkout session response');
      }

      // Prefer the Stripe-provided URL if available
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href = `https://checkout.stripe.com/c/pay/${data.id}`;
      }
    } catch (error) {
      console.error('Registration error:', error);
      navigate('/registration/error', {
        state: {
          error: error instanceof Error ? error.message : 'Failed to process registration'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleRegistration,
    price: prices[leagueType],
    isPaymentEnabled: Boolean(prices[leagueType])
  };
}