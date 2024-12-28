import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegistration } from '@/lib/hooks/use-registration';
import { FormButton } from '../ui/form-button';
import { FormError } from '../ui/form-error';
import { PRICES } from '@/lib/config/stripe';

const playerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  shirtSize: z.enum(['S', 'M', 'L', 'XL', 'XXL'], {
    required_error: 'Please select a shirt size',
  }),
});

const longDaySchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  player1: playerSchema,
  player2: playerSchema,
  player3: playerSchema,
  player4: playerSchema,
});

type LongDayFormData = z.infer<typeof longDaySchema>;

export function LongDayRegistrationForm() {
  const { isSubmitting, handleRegistration, isPaymentEnabled } = useRegistration('longday');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LongDayFormData>({
    resolver: zodResolver(longDaySchema),
  });

  const renderPlayerFields = (playerNumber: number) => (
    <div key={`player-${playerNumber}`} className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-lg">Player {playerNumber}</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register(`player${playerNumber}.name`)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors[`player${playerNumber}`]?.name?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register(`player${playerNumber}.email`)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors[`player${playerNumber}`]?.email?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          {...register(`player${playerNumber}.phone`)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors[`player${playerNumber}`]?.phone?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Shirt Size</label>
        <select
          {...register(`player${playerNumber}.shirtSize`)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select a size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">X-Large</option>
          <option value="XXL">XX-Large</option>
        </select>
        <FormError message={errors[`player${playerNumber}`]?.shirtSize?.message} />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          {...register('teamName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.teamName?.message} />
      </div>

      {[1, 2, 3, 4].map((number) => renderPlayerFields(number))}

      <FormButton
        type="submit"
        isLoading={isSubmitting}
        loadingText="Processing..."
        disabled={!isPaymentEnabled}
      >
        {isPaymentEnabled 
          ? `Proceed to Payment - $${PRICES.longday / 100}`
          : 'Registration Currently Unavailable'}
      </FormButton>

      {!isPaymentEnabled && (
        <p className="text-sm text-red-600 text-center">
          Payment system is currently unavailable. Please try again later.
        </p>
      )}
    </form>
  );
}