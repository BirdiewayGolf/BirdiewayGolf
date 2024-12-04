import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Clock, 
  Mail, 
  Phone,
  ChevronLeft
} from 'lucide-react';
import api from '../../services/api';

const TournamentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchTournamentData();
  }, [id]);

  const fetchTournamentData = async () => {
    try {
      setLoading(true);
      // Fetch tournament details
      const tournamentResponse = await api.get(`/admin/tournaments/${id}`);
      setTournament(tournamentResponse.data);
      
      // Fetch registrations for this tournament
      const registrationsResponse = await api.get(`/admin/tournaments/${id}/registrations`);
      setRegistrations(registrationsResponse.data);
      
      setError('');
    } catch (err) {
      console.error('Error fetching tournament details:', err);
      setError('Failed to load tournament details');
      toast.error('Failed to load tournament information');
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">
          {error || 'Tournament not found'}
          <button
            onClick={fetchTournamentData}
            className="ml-4 text-emerald-600 hover:text-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/tournaments')}
          className="flex items-center text-gray-600 hover:text-emerald-600"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Tournaments
        </button>
      </div>

      {/* Tournament Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{tournament.name}</h1>
            <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${
              tournament.league === 'business' ? 'bg-blue-100 text-blue-800' :
              tournament.league === 'amateur' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {tournament.league.charAt(0).toUpperCase() + tournament.league.slice(1)} League
            </span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/admin/tournaments/${id}/edit`)}
              className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Edit Tournament
            </button>
          </div>
        </div>

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

      {/* Tournament Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-700">{tournament.description}</p>
          </div>
          
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

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tournament.contactEmail && (
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-emerald-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{tournament.contactEmail}</p>
              </div>
            </div>
          )}
          
          {tournament.contactPhone && (
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-emerald-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{tournament.contactPhone}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Registrations Section */}
      {/* Registrations Section */}
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold mb-4">Registrations</h2>
  {registrations.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Handicap
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registration Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {registrations.map((registration) => (
            <tr key={registration._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {registration.playerName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  registration.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  registration.status === 'waitlist' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  registration.paymentStatus === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {registration.paymentStatus.charAt(0).toUpperCase() + registration.paymentStatus.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {registration.handicap || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  <div>{registration.email}</div>
                  <div>{registration.phone}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(registration.registrationDate).toLocaleDateString()}
                </div>
                {registration.notes && (
                  <div className="text-xs text-gray-400 mt-1">
                    {registration.notes}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Registration Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Registration Status</h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="text-sm">Confirmed:</div>
            <div className="text-sm font-medium">{registrations.filter(r => r.status === 'confirmed').length}</div>
            <div className="text-sm">Waitlist:</div>
            <div className="text-sm font-medium">{registrations.filter(r => r.status === 'waitlist').length}</div>
            <div className="text-sm">Cancelled:</div>
            <div className="text-sm font-medium">{registrations.filter(r => r.status === 'cancelled').length}</div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="text-sm">Completed:</div>
            <div className="text-sm font-medium">{registrations.filter(r => r.paymentStatus === 'completed').length}</div>
            <div className="text-sm">Pending:</div>
            <div className="text-sm font-medium">{registrations.filter(r => r.paymentStatus === 'pending').length}</div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Capacity</h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="text-sm">Total Spots:</div>
            <div className="text-sm font-medium">{tournament.maxPlayers}</div>
            <div className="text-sm">Available:</div>
            <div className="text-sm font-medium">
              {tournament.maxPlayers - registrations.filter(r => r.status === 'confirmed').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-gray-500 text-center py-4">No registrations yet</p>

        )}
      </div>
    </div>
  );
};

export default TournamentDetails;