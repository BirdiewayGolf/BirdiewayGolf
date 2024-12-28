import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { sponsorshipTiers } from '@/lib/data/sponsorship';

export function SponsorshipTiers() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Platinum Tier */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
            <Trophy className="h-12 w-12 text-[#C5A572] mb-6" />
            <h3 className="text-2xl font-bold mb-4">{sponsorshipTiers[0].title}</h3>
            <p className="text-gray-300 mb-6">{sponsorshipTiers[0].description}</p>
            <ul className="space-y-3">
              {sponsorshipTiers[0].benefits.map((benefit) => (
                <li key={benefit} className="flex items-start">
                  <span className="text-[#C5A572] mr-2">•</span>
                  <span className="text-gray-200">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gold Tier */}
          <div className="bg-gradient-to-br from-[#C5A572] to-[#8B7355] rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
            <Award className="h-12 w-12 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-4">{sponsorshipTiers[1].title}</h3>
            <p className="text-gray-100 mb-6">{sponsorshipTiers[1].description}</p>
            <ul className="space-y-3">
              {sponsorshipTiers[1].benefits.map((benefit) => (
                <li key={benefit} className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  <span className="text-gray-100">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}