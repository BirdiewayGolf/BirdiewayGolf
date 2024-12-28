import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { TournamentListItem } from '@/components/admin/tournaments/tournament-list-item';
import { Plus } from 'lucide-react';
import { useTournamentStore } from '@/lib/stores/tournament-store';

export function TournamentList() {
  const tournaments = useTournamentStore((state) => state.tournaments);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tournaments</h1>
          <Link
            to="/admin/tournaments/create"
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Tournament
          </Link>
        </div>

        <div className="space-y-4">
          {tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <TournamentListItem key={tournament.id} tournament={tournament} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 mb-4">No tournaments found</p>
              <Link
                to="/admin/tournaments/create"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Create your first tournament
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}