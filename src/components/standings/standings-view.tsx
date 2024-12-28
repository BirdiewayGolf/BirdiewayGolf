import React from 'react';
import { Trophy } from 'lucide-react';
import type { StandingsEntry } from '@/lib/types/standings';

interface StandingsViewProps {
  standings: StandingsEntry[];
}

export function StandingsView({ standings }: StandingsViewProps) {
  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
        {standings.slice(0, 3).map((entry, index) => (
          <div
            key={entry.id}
            className={`relative ${
              index === 1 ? 'order-first' : ''
            } bg-white rounded-lg shadow-lg p-4 text-center transform hover:scale-105 transition-transform`}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Trophy
                className={`h-6 w-6 ${
                  index === 0
                    ? 'text-yellow-500'
                    : index === 1
                    ? 'text-gray-400'
                    : 'text-amber-600'
                }`}
              />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900">#{index + 1}</div>
              <div className="font-semibold text-gray-800 mt-2">{entry.teamName}</div>
              <div className="text-sm text-gray-600">{entry.playerNames}</div>
              <div className="mt-2 text-green-600 font-semibold">
                {entry.totalPoints} pts
              </div>
              <div className="text-sm text-gray-500">
                Avg: {entry.scoringAverage.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Standings Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team/Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Behind Leader
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {standings.map((entry, index) => {
              const pointsBehind = index > 0 ? standings[0].totalPoints - entry.totalPoints : 0;
              
              return (
                <tr
                  key={entry.id}
                  className={index < 3 ? 'bg-gray-50' : undefined}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.teamName}</div>
                    <div className="text-sm text-gray-500">{entry.playerNames}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.totalPoints}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.scoringAverage.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pointsBehind > 0 ? `${pointsBehind} pts` : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}