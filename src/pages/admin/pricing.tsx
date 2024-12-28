import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { PricingForm } from '@/components/admin/pricing/pricing-form';
import { useLeaguePricingStore } from '@/lib/stores/league-pricing-store';
import type { LeaguePricing } from '@/lib/types/league-pricing';

export function AdminPricing() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { prices, updatePrice } = useLeaguePricingStore();

  const handleSubmit = async (data: LeaguePricing) => {
    try {
      setIsSubmitting(true);
      Object.entries(data).forEach(([league, price]) => {
        updatePrice(league as keyof LeaguePricing, price);
      });
      alert('Prices updated successfully');
    } catch (error) {
      console.error('Failed to update prices:', error);
      alert('Failed to update prices');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">League Pricing</h1>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <PricingForm
            initialData={prices}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </AdminLayout>
  );
}