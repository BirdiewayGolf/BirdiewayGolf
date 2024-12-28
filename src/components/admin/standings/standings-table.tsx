import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { StandingsEntry } from '@/lib/types/standings';

interface StandingsTableProps {
  standings: StandingsEntry[];
  onEdit: (entry: StandingsEntry) => void;
  onDelete: (id: string) => void;
}

export function StandingsTable({ standings, onEdit, onDelete }: StandingsTableProps) {
  return (
    <div className="overflow-x-auto">
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
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {standings.map((entry, index) => (
            <tr key={entry.id} className="hover:bg-gray-50">
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
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => onEdit(entry)}
                    className="text-green-600 hover:text-green-900 transition-colors"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}