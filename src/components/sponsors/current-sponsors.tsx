import React from 'react';
import { currentSponsors } from '@/lib/data/sponsorship';

export function CurrentSponsors() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Current Partners
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentSponsors.map((sponsor) => (
            <div 
              key={sponsor.name}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {sponsor.name}
              </h3>
              <p className="text-sm text-gray-500">{sponsor.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}