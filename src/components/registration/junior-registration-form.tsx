import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegistration } from '@/lib/hooks/use-registration';
import { FormButton } from '@/components/ui/form-button';
import { FormError } from '@/components/ui/form-error';
import { useLeaguePricingStore } from '@/lib/stores/league-pricing-store';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price / 100);
};

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
  const price = useLeaguePricingStore((state) => state.prices.junior);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JuniorFormData>({
    resolver: zodResolver(juniorSchema),
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0A5C36]">Junior League Registration</h2>
              <p className="mt-2 text-gray-600">Enter player and guardian information below</p>
            </div>

            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-[#C5A572]/20">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Player Name</label>
                    <input
                      type="text"
                      {...register('playerName')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                      placeholder="Enter player's full name"
                    />
                    <FormError message={errors.playerName?.message} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Date of Birth</label>
                      <input
                        type="date"
                        {...register('dateOfBirth')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                      />
                      <FormError message={errors.dateOfBirth?.message} />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Shirt Size</label>
                      <select
                        {...register('shirtSize')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                      >
                        <option value="">Select a size</option>                    
                        <option value="YXS">Youth Extra Small</option> 
                        <option value="YS">Youth Small</option> 
                        <option value="YM">Youth Medium</option> 
                        <option value="YL">Youth Large</option>
                         <option value="YXL">Youth XL</option> 
                        <option value="XS">Adult X-Small</option> 
                        <option value="AS">Adult Small</option> 
                        <option value="AM">Adult Medium</option> 
                        <option value="AL">Adult Large</option> 
                        <option value="AXL">Adult XL</option> 
                        <option value="A2XL">Adult 2XL</option> 
                      </select>
                      <FormError message={errors.shirtSize?.message} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-[#C5A572]/20">
                <h3 className="text-lg font-semibold text-[#0A5C36] mb-6">Parent/Guardian Information</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Full Name</label>
                    <input
                      type="text"
                      {...register('parentName')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                      placeholder="Enter parent/guardian name"
                    />
                    <FormError message={errors.parentName?.message} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Email</label>
                      <input
                        type="email"
                        {...register('parentEmail')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                        placeholder="Enter email address"
                      />
                      <FormError message={errors.parentEmail?.message} />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Phone</label>
                      <input
                        type="tel"
                        {...register('parentPhone')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
                        placeholder="(123) 456-7890"
                      />
                      <FormError message={errors.parentPhone?.message} />
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