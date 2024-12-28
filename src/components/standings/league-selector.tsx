import React from 'react';
import type { LeagueType } from '@/lib/types/standings';

interface LeagueSelectorProps {
  selectedLeague: LeagueType;
  onLeagueChange: (league: LeagueType) => void;
}

export function LeagueSelector({ selectedLeague, onLeagueChange }: LeagueSelectorProps) {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      <button
        onClick={() => onLeagueChange('business')}
        className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
          selectedLeague === 'business'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Business League
      </button>
      <button
        onClick={() => onLeagueChange('junior')}
        className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
          selectedLeague === 'junior'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Junior League
      </button>
    </div>
  );
}