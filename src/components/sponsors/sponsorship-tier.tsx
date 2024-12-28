import React from 'react';
import { Check, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SponsorshipTierProps {
  title: string;
  icon: LucideIcon;
  price: string;
  color: string;
  features: string[];
  isPopular?: boolean;
}

export function SponsorshipTier({
  title,
  icon: Icon,
  price,
  color,
  features,
  isPopular
}: SponsorshipTierProps) {
  return (
    <div className={cn(
      "relative bg-white rounded-2xl shadow-lg transition-transform hover:scale-105",
      isPopular && "ring-2 ring-[#0A5C36]"
    )}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-[#0A5C36] text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        <div className={cn(
          "inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-6",
          color
        )}>
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-[#0A5C36] mb-6">{price}</p>

        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <Check className="h-5 w-5 text-[#0A5C36] mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}