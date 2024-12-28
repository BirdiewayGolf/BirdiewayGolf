import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe } from './use-stripe';
import { processRegistration } from '../services/registration';
import { PRICES } from '../config/stripe';
import type { LeagueType } from '../types/registration';

export function useRegistration(leagueType: LeagueType) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { createCheckoutSession, isConfigured } = useStripe();

  const handleRegistration = async (formData: any) => {
    try {
      setIsSubmitting(true);

      // Process registration and send notifications
      await processRegistration({
        leagueType,
        ...formData
      });

      if (!isConfigured) {
        throw new Error('Payment system is not available');
      }

      const { stripe, price } = await createCheckoutSession({
        leagueType,
        formData: {
          ...formData,
          price: PRICES[leagueType]
        }
      });

      // Store registration data in localStorage for admin dashboard
      const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      registrations.push({
        id: Date.now(),
        date: new Date().toISOString(),
        leagueType,
        ...formData
      });
      localStorage.setItem('registrations', JSON.stringify(registrations));
      
    } catch (error) {
      console.error('Registration error:', error);
      navigate('/registration/error', { 
        state: { error: error instanceof Error ? error.message : 'Failed to process registration' }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleRegistration,
    isPaymentEnabled: isConfigured
  };
}