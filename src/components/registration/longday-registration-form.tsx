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

const playerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  shirtSize: z.enum(['S', 'M', 'L', 'XL', 'XXL'], {
    required_error: 'Please select a shirt size',
  }),
});

const longDaySchema = z.object({
  player1: playerSchema,
  player2: playerSchema,
  player3: playerSchema,
  player4: playerSchema,
});

type LongDayFormData = z.infer<typeof longDaySchema>;

export function LongDayRegistrationForm() {
  const { isSubmitting, handleRegistration, isPaymentEnabled } = useRegistration('longday');
  const price = useLeaguePricingStore((state) => state.prices.longday);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LongDayFormData>({
    resolver: zodResolver(longDaySchema),
  });

  const renderPlayerFields = (playerNumber: 1 | 2 | 3 | 4) => (
    <div key={`player-${playerNumber}`} className="bg-gray-50 p-6 rounded-xl border border-[#C5A572]/20 mb-6">
      <h3 className="text-lg font-semibold text-[#0A5C36] mb-6">Player {playerNumber}</h3>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Name</label>
          <input
            type="text"
            {...register(`player${playerNumber}.name` as const)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
            placeholder="Enter player's full name"
          />
          <FormError message={errors?.[`player${playerNumber}`]?.name?.message} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Email</label>
          <input
            type="email"
            {...register(`player${playerNumber}.email` as const)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
            placeholder="Enter email address"
          />
          <FormError message={errors?.[`player${playerNumber}`]?.email?.message} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Phone</label>
          <input
            type="tel"
            {...register(`player${playerNumber}.phone` as const)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
            placeholder="(123) 456-7890"
          />
          <FormError message={errors?.[`player${playerNumber}`]?.phone?.message} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#0A5C36] mb-2">Shirt Size</label>
          <select
            {...register(`player${playerNumber}.shirtSize` as const)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C5A572] focus:ring-[#C5A572] transition-colors"
          >
            <option value="">Select a size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">X-Large</option>
            <option value="XXL">XX-Large</option>
          </select>
          <FormError message={errors?.[`player${playerNumber}`]?.shirtSize?.message} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0A5C36]">Long Day Tournament Registration</h2>
              <p className="mt-2 text-gray-600">Enter player information below</p>
            </div>

            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-8">
              {[1, 2, 3, 4].map((number) => renderPlayerFields(number as 1 | 2 | 3 | 4))}

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