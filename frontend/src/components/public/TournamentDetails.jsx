import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { toast } from 'react-toastify';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Info,
  Check,
  Building,
  Globe,
  ChevronLeft,
  Mail
} from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const TournamentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.tournaments.getDetails(id);
        
        let tournamentData;
        if (Array.isArray(response.data.data)) {
          tournamentData = response.data.data.find(t => t._id === id);
        } else {
          tournamentData = response.data.data;
        }

        if (!tournamentData) {
          throw new Error('Tournament not found');
        }

        setTournament(tournamentData);
      } catch (error) {
        console.error('Error fetching tournament:', error);
        setError(error.message);
        toast.error('Failed to load tournament details');
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    try {
      return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    } catch {
      return timeString;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading tournament details...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !tournament) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
          <div className="text-lg text-red-600">
            {error || 'Tournament not found'}
          </div>
          <button
            onClick={() => navigate('/tournaments')}
            className="px-4 py-2 text-emerald-600 hover:text-emerald-700 flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Tournaments</span>
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="max-w-4xl mx-auto mb-6">
          <nav className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-emerald-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/tournaments" className="hover:text-emerald-600">Tournaments</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{tournament.name}</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{tournament.name}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Tournament Date: {formatDate(tournament.date)}</span>
                </div>

                {tournament.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{tournament.location}</span>
                  </div>
                )}

                {tournament.price !== undefined && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <span>Entry Fee: ${tournament.price}</span>
                  </div>
                )}

                {tournament.league && (
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-gray-500" />
                    <span className="capitalize">{tournament.league} League</span>
                  </div>
                )}
              </div>

              {tournament.description && (
                <div className="mt-4">
                  <p className="text-gray-600 whitespace-pre-line">
                    {tournament.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Schedule Information */}
          {tournament.schedule && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tournament.schedule.startTime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>Start Time: {formatTime(tournament.schedule.startTime)}</span>
                  </div>
                )}

                {tournament.schedule.checkInTime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>Check-in Time: {formatTime(tournament.schedule.checkInTime)}</span>
                  </div>
                )}

                {tournament.schedule.format && (
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <Info className="w-5 h-5 text-gray-500" />
                      <span>Format: {tournament.schedule.format}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sponsor Information */}
          {tournament.sponsorInfo && Object.values(tournament.sponsorInfo).some(value => value) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Sponsor Information</h2>
              <div className="space-y-3">
                {tournament.sponsorInfo.name && (
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-gray-500" />
                    <span><span className="font-medium">Sponsor:</span> {tournament.sponsorInfo.name}</span>
                  </div>
                )}
                {tournament.sponsorInfo.website && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <span>
                      <span className="font-medium">Website:</span>{' '}
                      <a 
                        href={tournament.sponsorInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        {tournament.sponsorInfo.website}
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Details */}
          {tournament.additionalDetails && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
              <div className="space-y-4">
                {tournament.additionalDetails.cancelationPolicy && (
                  <div>
                    <h3 className="font-medium">Cancellation Policy</h3>
                    <p>{tournament.additionalDetails.cancelationPolicy}</p>
                  </div>
                )}

                {tournament.additionalDetails.food?.included && (
                  <div>
                    <h3 className="font-medium">Food & Beverages</h3>
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>Included</span>
                    </div>
                    {tournament.additionalDetails.food.details && (
                      <p className="mt-1 text-gray-600">
                        {tournament.additionalDetails.food.details}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Interested in Joining?</h2>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-emerald-800">Want to participate?</h3>
                    <p className="text-emerald-700">
                      Contact us to learn more about this tournament and how to join!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => navigate('/contact', {
                    state: {
                      tournamentInfo: {
                        id: tournament._id,
                        name: tournament.name,
                        league: tournament.league
                      }
                    }
                  })}
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Us to Join</span>
                </button>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={() => navigate('/tournaments')}
              className="flex items-center px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Back to Tournaments</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TournamentDetails;