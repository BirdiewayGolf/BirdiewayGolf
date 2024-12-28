import React from 'react';
import { formatScore, formatRelativeToPar, getScoreClass } from '@/lib/utils/score';
import type { LeaderboardEntry } from '@/lib/types/tournament';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  position: number;
  coursePar: number;
}

export function LeaderboardRow({ entry, position, coursePar }: LeaderboardRowProps) {
  return (
    <tr className={position < 3 ? 'bg-gray-50' : undefined}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {position + 1}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{entry.teamName}</div>
        <div className="text-sm text-gray-500">
          {Array.isArray(entry.playerNames) ? entry.playerNames.join(', ') : entry.playerNames}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatScore(entry.score)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-sm font-medium ${getScoreClass(entry.score, coursePar)}`}>
          {formatRelativeToPar(entry.score, coursePar)}
        </span>
      </td>
    </tr>
  );
}