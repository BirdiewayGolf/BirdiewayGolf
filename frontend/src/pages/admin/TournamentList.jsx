import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { apiService } from '../../services/api';

const TournamentList = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setRefreshing(true);
      const response = await apiService.tournaments.getAll();
      // Extract data from response properly
      const tournamentsData = response.data?.data || response.data || [];
      setTournaments(Array.isArray(tournamentsData) ? tournamentsData : []);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch tournaments');
      toast.error('Failed to load tournaments');
      setTournaments([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEditClick = (tournamentId) => {
    navigate(`/admin/tournaments/${tournamentId}/edit`);
  };

  const handleDelete = async (tournamentId) => {
    if (!window.confirm('Are you sure you want to delete this tournament?')) {
      return;
    }

    try {
      await apiService.tournaments.delete(tournamentId);
      toast.success('Tournament deleted successfully');
      fetchTournaments();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete tournament');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading tournaments...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Tournaments</h1>
          <button
            onClick={fetchTournaments}
            disabled={refreshing}
            className="ml-4 p-2 text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <Link
          to="/admin/tournaments/new"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Create Tournament
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchTournaments}
            className="mt-2 text-emerald-600 hover:text-emerald-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Tournament Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 mb-4">No tournaments found</p>
            <Link
              to="/admin/tournaments/new"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Create Your First Tournament
            </Link>
          </div>
        ) : (
          tournaments.map((tournament) => (
            <div key={tournament._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                  {new Date(tournament.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                  {tournament.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-emerald-600" />
                  {tournament.currentPlayers || 0}/{tournament.maxPlayers} players
                </div>
              </div>
              <div className="mt-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  tournament.league === 'business' ? 'bg-blue-100 text-blue-800' :
                  tournament.league === 'junior' ? 'bg-green-100 text-green-800' :
                  tournament.league === 'fundraiser' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {tournament.league.charAt(0).toUpperCase() + tournament.league.slice(1)}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditClick(tournament._id)}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tournament._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
                <Link
                  to={`/admin/tournaments/${tournament._id}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TournamentList;