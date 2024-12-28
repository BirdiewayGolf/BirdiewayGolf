import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { Calendar, Trophy } from 'lucide-react';
import { useTournamentStore } from '@/lib/stores/tournament-store';
import { sortTournamentsByDate } from '@/lib/utils/tournament';

export function AdminDashboard() {
  const tournaments = useTournamentStore((state) => state.tournaments);
  const upcomingTournaments = sortTournamentsByDate(
    tournaments.filter(t => new Date(t.date) >= new Date())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/admin/tournaments"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Tournaments</h3>
                <p className="text-3xl font-bold text-gray-900">{upcomingTournaments.length}</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/standings"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Trophy className="h-10 w-10 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">League Standings</h3>
                <p className="text-sm text-gray-600">View & manage standings</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Upcoming Tournaments */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Tournaments</h2>
              <Link 
                to="/admin/tournaments/create"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Create New
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {upcomingTournaments.length > 0 ? (
              upcomingTournaments.map((tournament) => (
                <Link
                  key={tournament.id}
                  to={`/admin/tournaments/${tournament.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{tournament.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(tournament.date).toLocaleDateString()} • {tournament.location}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {tournament.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>No upcoming tournaments</p>
                <Link 
                  to="/admin/tournaments/create"
                  className="text-green-600 hover:text-green-700 font-medium inline-block mt-2"
                >
                  Create your first tournament
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}