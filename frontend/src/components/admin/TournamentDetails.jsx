import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { toast } from 'react-toastify';
import {
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Globe,
  Edit,
  Trash2,
  ChevronLeft
} from 'lucide-react';

const AdminTournamentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournament();
  }, [id]);

  const fetchTournament = async () => {
    try {
      setLoading(true);
      const response = await apiService.tournaments.getOne(id);
      setTournament(response.data.data);
    } catch (error) {
      console.error('Error fetching tournament:', error);
      toast.error('Failed to load tournament details');
      navigate('/admin/tournaments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this tournament?')) {
      return;
    }

    try {
      await apiService.tournaments.delete(id);
      toast.success('Tournament deleted successfully');
      navigate('/admin/tournaments');
    } catch (error) {
      console.error('Error deleting tournament:', error);
      toast.error('Failed to delete tournament');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not set';
    try {
      return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    } catch {
      return timeString || 'Not set';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading tournament details...</div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Tournament not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tournament Details</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/admin/tournaments')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to List
          </button>
          <button
            onClick={() => navigate(`/admin/tournaments/edit/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-3">
            <p className="flex items-center">
              <span className="font-medium w-32">Name:</span>
              {tournament.name || 'Not set'}
            </p>
            <p className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-medium w-32">Date:</span>
              {formatDate(tournament.date)}
            </p>
            <p className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="font-medium w-32">Location:</span>
              {tournament.location || 'Not set'}
            </p>
            <p className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="font-medium w-32">Entry Fee:</span>
              ${tournament.price || '0'}
            </p>
            <p className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              <span className="font-medium w-32">League:</span>
              {tournament.league ? tournament.league.charAt(0).toUpperCase() + tournament.league.slice(1) : 'Not set'}
            </p>
            <div className="mt-4">
              <span className="font-medium">Description:</span>
              <p className="mt-2 text-gray-600 whitespace-pre-line">
                {tournament.description || 'No description provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Schedule Information</h2>
          <div className="space-y-3">
            {tournament.schedule && (
              <>
                <p className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium w-32">Start Time:</span>
                  {formatTime(tournament.schedule.startTime)}
                </p>
                <p className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium w-32">Check-in Time:</span>
                  {formatTime(tournament.schedule.checkInTime)}
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-32">Format:</span>
                  {tournament.schedule.format || 'Not set'}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Sponsor Information */}
        {tournament.sponsorInfo && (Object.values(tournament.sponsorInfo).some(v => v)) && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Sponsor Information</h2>
            <div className="space-y-3">
              {tournament.sponsorInfo.name && (
                <p className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  <span className="font-medium w-32">Name:</span>
                  {tournament.sponsorInfo.name}
                </p>
              )}
              {tournament.sponsorInfo.website && (
                <p className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  <span className="font-medium w-32">Website:</span>
                  <a
                    href={tournament.sponsorInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {tournament.sponsorInfo.website}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Additional Details */}
        {tournament.additionalDetails && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
            <div className="space-y-4">
              {tournament.additionalDetails.cancelationPolicy && (
                <div>
                  <span className="font-medium">Cancellation Policy:</span>
                  <p className="mt-1 text-gray-600">{tournament.additionalDetails.cancelationPolicy}</p>
                </div>
              )}

              {tournament.additionalDetails.food?.included && (
                <div>
                  <span className="font-medium">Food & Beverages:</span>
                  <p className="mt-1 text-gray-600">
                    {tournament.additionalDetails.food.details || 'Food and beverages will be provided'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTournamentDetails;