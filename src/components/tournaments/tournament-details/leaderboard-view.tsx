import React from 'react';
import { LeaderboardHeader } from './leaderboard-header';
import { LeaderboardRow } from './leaderboard-row';
import type { LeaderboardEntry } from '@/lib/types/tournament';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  coursePar: number;
}

export function LeaderboardView({ entries, coursePar }: LeaderboardViewProps) {
  const sortedEntries = [...entries].sort((a, b) => a.score - b.score);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <LeaderboardHeader />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player/Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To Par
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEntries.map((entry, index) => (
              <LeaderboardRow
                key={entry.id}
                entry={entry}
                position={index}
                coursePar={coursePar}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}