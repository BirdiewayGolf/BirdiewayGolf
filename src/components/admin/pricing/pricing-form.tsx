import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormError } from '@/components/ui/form-error';
import { FormButton } from '@/components/ui/form-button';
import type { LeaguePricing } from '@/lib/types/league-pricing';

const pricingSchema = z.object({
  business: z.number().min(0, 'Price must be 0 or greater'),
  junior: z.number().min(0, 'Price must be 0 or greater'),
  longday: z.number().min(0, 'Price must be 0 or greater'),
});

interface PricingFormProps {
  initialData: LeaguePricing;
  onSubmit: (data: LeaguePricing) => void;
  isSubmitting?: boolean;
}

export function PricingForm({ initialData, onSubmit, isSubmitting }: PricingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeaguePricing>({
    resolver: zodResolver(pricingSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Business League Series Price ($)</label>
        <input
          type="number"
          {...register('business', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.business?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Junior League Series Price ($)</label>
        <input
          type="number"
          {...register('junior', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.junior?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Long Day Tournament Price ($)</label>
        <input
          type="number"
          {...register('longday', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.longday?.message} />
      </div>

      <FormButton
        type="submit"
        isLoading={isSubmitting}
        loadingText="Saving..."
        className="bg-[#0A5C36] hover:bg-[#0A5C36]/90"
      >
        Save Prices
      </FormButton>
    </form>
  );
}