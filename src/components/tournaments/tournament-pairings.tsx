import React from 'react';
import { Clock, Flag } from 'lucide-react';
import type { TournamentPairing } from '@/lib/types/tournament';

interface TournamentPairingsProps {
  pairings: TournamentPairing[];
}

export function TournamentPairings({ pairings }: TournamentPairingsProps) {
  const sortedPairings = [...pairings].sort((a, b) => {
    // Sort by tee time first
    const timeCompare = a.teeTime.localeCompare(b.teeTime);
    if (timeCompare !== 0) return timeCompare;
    // Then by group number
    return a.groupNumber - b.groupNumber;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Tee Times & Pairings
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="divide-y divide-gray-200">
          {sortedPairings.map((pairing) => (
            <div key={pairing.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-green-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-medium">{pairing.teeTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Flag className="h-5 w-5 mr-2" />
                    <span>Hole {pairing.startingHole}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Group {pairing.groupNumber}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-900">
                  {pairing.players.filter(Boolean).join(' • ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}