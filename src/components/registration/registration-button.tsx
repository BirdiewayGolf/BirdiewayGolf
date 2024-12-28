import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeaguePricingStore } from '@/lib/stores/league-pricing-store';
import { createCheckoutSession } from '@/lib/hooks/use-stripe';
import { LoadingSpinner } from '../ui/loading-spinner';
import type { LeagueType } from '@/lib/types/league-pricing';

interface RegistrationButtonProps {
  leagueType: LeagueType;
}

export function RegistrationButton({ leagueType }: RegistrationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const prices = useLeaguePricingStore((state) => state.prices);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await createCheckoutSession({ 
        leagueType,
        price: prices[leagueType]
      });
    } catch (error) {
      console.error('Registration error:', error);
      navigate('/registration/error', {
        state: { error: error instanceof Error ? error.message : 'Failed to start registration' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          <span className="ml-2">Processing...</span>
        </>
      ) : (
        `Register Now - $${prices[leagueType]}`
      )}
    </button>
  );
}