// src/pages/admin/TournamentList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './TournamentList.css';

const TournamentList = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchTournaments();
  }, [navigate]);

  const fetchTournaments = async () => {
    try {
      setRefreshing(true);
      const response = await api.get('/admin/tournaments');
      console.log('Tournament data:', response.data);
      if (response.data.length > 0) {
        console.log('First tournament:', response.data[0]);
      }
      setTournaments(response.data);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response?.status === 401) {
        navigate('/admin/login');
      } else {
        setError('Failed to fetch tournaments');
        toast.error('Failed to load tournaments');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEditClick = (tournamentId) => {
    console.log('Editing tournament with ID:', tournamentId);
    navigate(`/admin/tournaments/${tournamentId}/edit`);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-gray-600">Loading tournaments...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-red-600">
        {error}
        <button
          onClick={fetchTournaments}
          className="ml-4 text-emerald-600 hover:text-emerald-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );

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

      {/* Tournament Grid */}
      {tournaments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No tournaments found</p>
          <Link
            to="/admin/tournaments/new"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Create Your First Tournament
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
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
                  {tournament.maxPlayers} players max
                </div>
              </div>
              <div className="mt-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  tournament.league === 'business' ? 'bg-blue-100 text-blue-800' :
                  tournament.league === 'amateur' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {tournament.league.charAt(0).toUpperCase() + tournament.league.slice(1)} League
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleEditClick(tournament._id)}
                  className="text-gray-500 hover:text-emerald-600"
                >
                  Edit
                </button>
                <Link
                  to={`/admin/tournaments/${tournament._id}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentList;