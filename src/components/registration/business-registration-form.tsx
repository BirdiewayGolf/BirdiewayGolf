import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegistration } from '@/lib/hooks/use-registration';
import { FormButton } from '../ui/form-button';
import { FormError } from '../ui/form-error';
import { useLeaguePricingStore } from '@/lib/stores/league-pricing-store';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price / 100);
};

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
  const price = useLeaguePricingStore((state) => state.prices.business);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0A5C36]">Business League Registration</h2>
              <p className="mt-2 text-gray-600">Enter your team and company information below</p>
            </div>
            
            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-[#C5A572]/20">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Team Name</label>
                      <input
                        type="text"
                        {...register('teamName')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                        placeholder="Enter team name"
                      />
                      <FormError message={errors.teamName?.message} />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Company Name</label>
                      <input
                        type="text"
                        {...register('companyName')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                        placeholder="Enter company name"
                      />
                      <FormError message={errors.companyName?.message} />
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Contact Name</label>
                      <input
                        type="text"
                        {...register('contactName')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                        placeholder="Enter contact name"
                      />
                      <FormError message={errors.contactName?.message} />
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Email</label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                        placeholder="Enter email address"
                      />
                      <FormError message={errors.email?.message} />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Phone</label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                        placeholder="(123) 456-7890"
                      />
                      <FormError message={errors.phone?.message} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <FormButton
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Processing..."
                  disabled={!isPaymentEnabled}
                  className="w-full bg-[#0A5C36] hover:bg-[#0A5C36]/90 text-white text-lg font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isPaymentEnabled 
                    ? `Proceed to Payment - ${formatPrice(price)}`
                    : 'Registration Currently Unavailable'}
                </FormButton>

                {!isPaymentEnabled && (
                  <p className="mt-4 text-sm text-red-600 text-center">
                    Payment system is currently unavailable. Please try again later.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}