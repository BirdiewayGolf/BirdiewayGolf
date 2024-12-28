import React from 'react';
import { Clock, Flag } from 'lucide-react';
import type { TournamentPairing } from '@/lib/types/tournament';

interface PairingsViewProps {
  pairings: TournamentPairing[];
}

export function PairingsView({ pairings }: PairingsViewProps) {
  const sortedPairings = [...pairings].sort((a, b) => {
    const timeCompare = a.teeTime.localeCompare(b.teeTime);
    return timeCompare !== 0 ? timeCompare : a.groupNumber - b.groupNumber;
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-[#C5A572] mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Tee Times & Pairings</h3>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {sortedPairings.map((pairing) => (
          <div key={pairing.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-[#0A5C36] font-medium">
                  <Clock className="h-5 w-5 mr-2 text-[#C5A572]" />
                  <span>{pairing.teeTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Flag className="h-5 w-5 mr-2 text-[#C5A572]" />
                  <span>Hole {pairing.startingHole}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Group {pairing.groupNumber}
              </div>
            </div>
            <div className="mt-2">
              <div className="text-sm text-gray-600">
                {pairing.players.filter(Boolean).join(' • ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}