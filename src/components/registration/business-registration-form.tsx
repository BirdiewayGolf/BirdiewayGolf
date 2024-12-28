import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegistration } from '@/lib/hooks/use-registration';
import { FormButton } from '../ui/form-button';
import { FormError } from '../ui/form-error';
import { PRICES } from '@/lib/config/stripe';

const businessSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type BusinessFormData = z.infer<typeof businessSchema>;

export function BusinessRegistrationForm() {
  const { isSubmitting, handleRegistration, isPaymentEnabled } = useRegistration('business');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">
      {/* Form fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          {...register('teamName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.teamName?.message} />
      </div>

      {/* Other form fields... */}

      <FormButton
        type="submit"
        isLoading={isSubmitting}
        loadingText="Processing..."
        disabled={!isPaymentEnabled}
      >
        {isPaymentEnabled 
          ? `Proceed to Payment - $${PRICES.business / 100}`
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