import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { TournamentPairing } from '@/lib/types/tournament';

interface PairingsTableProps {
  pairings: TournamentPairing[];
  onEdit: (pairing: TournamentPairing) => void;
  onDelete: (id: string) => void;
}

export function PairingsTable({ pairings, onEdit, onDelete }: PairingsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Group
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Players
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tee Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Starting Hole
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pairings.map((pairing) => (
            <tr key={pairing.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {pairing.groupNumber}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {pairing.players.filter(Boolean).join(', ')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pairing.teeTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pairing.startingHole}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => onEdit(pairing)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(pairing.id)}
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
    </div>
  );
}