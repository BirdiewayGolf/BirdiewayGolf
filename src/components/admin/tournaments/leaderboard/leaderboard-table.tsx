import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { LeaderboardEntry } from '@/lib/types/tournament';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  onEdit: (entry: LeaderboardEntry) => void;
  onDelete: (id: string) => void;
}

export function LeaderboardTable({ 
  entries, 
  onEdit, 
  onDelete 
}: LeaderboardTableProps) {
  // Sort entries by score (low to high)
  const sortedEntries = [...entries].sort((a, b) => a.score - b.score);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player/Team Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Relative to Par
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedEntries.map((entry, index) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{entry.playerName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{entry.score}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className={`text-sm font-medium ${
                  entry.relativeToPar === 0 ? 'text-gray-900' :
                  entry.relativeToPar! > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {entry.relativeToPar === 0 ? 'E' : 
                   entry.relativeToPar! > 0 ? `+${entry.relativeToPar}` : entry.relativeToPar}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => onEdit(entry)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {entries.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No leaderboard entries yet
        </div>
      )}
    </div>
  );
}