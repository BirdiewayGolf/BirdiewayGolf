import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, Check, X, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import { apiService } from '../../services/api';

const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRegistrations();
  }, [filter]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await apiService.registrations.getAll({
        status: filter !== 'all' ? filter : undefined
      });
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (registrationId, newStatus) => {
    try {
      await apiService.registrations.updateRegistrationStatus(registrationId, newStatus);
      toast.success('Registration status updated');
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update registration status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading registrations...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tournament Registrations</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No registrations found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tournament
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((registration) => (
                  <tr key={registration._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/admin/tournaments/${registration.tournamentId}`}
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        {registration.tournament?.name}
                      </Link>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(registration.tournament?.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {registration.playerName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Mail className="w-4 h-4 mr-1" />
                        {registration.email}
                      </div>
                      {registration.phone && (
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="w-4 h-4 mr-1" />
                          {registration.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(registration.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(registration.status)}`}>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {registration.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(registration._id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(registration._id, 'cancelled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {registration.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(registration._id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                        {registration.status === 'cancelled' && (
                          <button
                            onClick={() => handleStatusUpdate(registration._id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationsList;