import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegistration } from '@/lib/hooks/use-registration';
import { FormButton } from '../ui/form-button';
import { FormError } from '../ui/form-error';
import { PRICES } from '@/lib/config/stripe';

const juniorSchema = z.object({
  playerName: z.string().min(2, 'Player name is required'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age < 18;
  }, 'Player must be under 18 years old'),
  shirtSize: z.enum(['YS', 'YM', 'YL', 'AS', 'AM', 'AL', 'AXL'], {
    required_error: 'Please select a shirt size',
  }),
  parentName: z.string().min(2, 'Parent name is required'),
  parentEmail: z.string().email('Invalid email address'),
  parentPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type JuniorFormData = z.infer<typeof juniorSchema>;

export function JuniorRegistrationForm() {
  const { isSubmitting, handleRegistration, isPaymentEnabled } = useRegistration('junior');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JuniorFormData>({
    resolver: zodResolver(juniorSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Player Name</label>
        <input
          type="text"
          {...register('playerName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.playerName?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          {...register('dateOfBirth')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.dateOfBirth?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Shirt Size</label>
        <select
          {...register('shirtSize')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select a size</option>
          <option value="YS">Youth Small</option>
          <option value="YM">Youth Medium</option>
          <option value="YL">Youth Large</option>
          <option value="AS">Adult Small</option>
          <option value="AM">Adult Medium</option>
          <option value="AL">Adult Large</option>
          <option value="AXL">Adult XL</option>
        </select>
        <FormError message={errors.shirtSize?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
        <input
          type="text"
          {...register('parentName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.parentName?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Parent/Guardian Email</label>
        <input
          type="email"
          {...register('parentEmail')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.parentEmail?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Parent/Guardian Phone</label>
        <input
          type="tel"
          {...register('parentPhone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.parentPhone?.message} />
      </div>

      <FormButton
        type="submit"
        isLoading={isSubmitting}
        loadingText="Processing..."
        disabled={!isPaymentEnabled}
      >
        {isPaymentEnabled 
          ? `Proceed to Payment - $${PRICES.junior / 100}`
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