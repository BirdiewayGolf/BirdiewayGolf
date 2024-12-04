import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign, Clock } from 'lucide-react';
import { tournamentService } from '../../services/api';

const TournamentDetails = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTournamentData();
  }, [id]);

  const fetchTournamentData = async () => {
    try {
      // Use tournamentService instead of direct api call
      const data = await tournamentService.getOne(id);
      setTournament(data);
      setError('');
    } catch (err) {
      console.error('Error fetching tournament:', err);
      setError('Failed to load tournament details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading tournament details...</div>
      </div>
    );
  }

  if (error || !tournament) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/tournaments" 
          className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block"
        >
          ← Back to Tournaments
        </Link>
        <div className="text-center text-red-600 mt-8">
          {error || 'Tournament not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        to="/tournaments" 
        className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block"
      >
        ← Back to Tournaments
      </Link>
      
      {/* Tournament Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{tournament.name}</h1>
        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
          tournament.league === 'business' ? 'bg-blue-100 text-blue-800' :
          tournament.league === 'amateur' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {tournament.league.charAt(0).toUpperCase() + tournament.league.slice(1)} League
        </span>

        {/* Tournament Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-gray-900">{new Date(tournament.date).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-emerald-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Registration Deadline</p>
              <p className="text-gray-900">{new Date(tournament.registrationDeadline).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-gray-900">{tournament.location}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Users className="w-5 h-5 text-emerald-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Capacity</p>
              <p className="text-gray-900">{tournament.maxPlayers} players</p>
            </div>
          </div>

          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-emerald-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Entry Fee</p>
              <p className="text-gray-900">${tournament.entryFee}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
        <div className="space-y-4">
          {tournament.description && (
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700">{tournament.description}</p>
            </div>
          )}
          
          {tournament.format && (
            <div>
              <h3 className="text-lg font-medium mb-2">Format</h3>
              <p className="text-gray-700">{tournament.format}</p>
            </div>
          )}
          
          {tournament.rules && (
            <div>
              <h3 className="text-lg font-medium mb-2">Rules</h3>
              <p className="text-gray-700">{tournament.rules}</p>
            </div>
          )}
          
          {tournament.prizeDistribution && (
            <div>
              <h3 className="text-lg font-medium mb-2">Prize Distribution</h3>
              <p className="text-gray-700">{tournament.prizeDistribution}</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Information */}
      {(tournament.courseName || tournament.courseAddress) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Course Information</h2>
          {tournament.courseName && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Course</h3>
              <p className="text-gray-700">{tournament.courseName}</p>
            </div>
          )}
          {tournament.courseAddress && (
            <div>
              <h3 className="text-lg font-medium mb-2">Address</h3>
              <p className="text-gray-700">{tournament.courseAddress}</p>
            </div>
          )}
        </div>
      )}

      {/* Register Button */}
      <div className="flex justify-center">
        <button 
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          onClick={() => alert('Registration feature coming soon!')}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default TournamentDetails;