import React from 'react';
import { Trophy } from 'lucide-react';

export function LeaderboardHeader() {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center">
        <Trophy className="h-5 w-5 text-[#C5A572] mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Tournament Leaderboard</h3>
      </div>
    </div>
  );
}