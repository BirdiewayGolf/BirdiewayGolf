import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getStripe } from '@/lib/stripe';
import { LEAGUE_PRICES } from '@/lib/config/stripe';

const businessSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  playerName: z.string().min(2, 'Player name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  handicap: z.number().min(0).max(36).optional(),
});

const juniorSchema = z.object({
  playerName: z.string().min(2, 'Player name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age < 18;
  }, 'Player must be under 18 years old'),
  parentName: z.string().min(2, 'Parent name is required'),
  handicap: z.number().min(0).max(36).optional(),
});

interface LeagueRegistrationFormProps {
  leagueType: 'business' | 'junior';
}

export function LeagueRegistrationForm({ leagueType }: LeagueRegistrationFormProps) {
  const schema = leagueType === 'business' ? businessSchema : juniorSchema;
  const price = LEAGUE_PRICES[leagueType];
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const stripe = await getStripe();
      if (!stripe) throw new Error('Stripe failed to load');

      // Create checkout session
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leagueType,
          price,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to process registration. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields remain the same */}
      {leagueType === 'business' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Name</label>
          <input
            type="text"
            {...register('teamName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.teamName && (
            <p className="mt-1 text-sm text-red-600">{errors.teamName.message as string}</p>
          )}
        </div>
      )}

      {/* Rest of the form fields... */}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Processing...' : 'Register Now'}
      </button>
    </form>
  );
}