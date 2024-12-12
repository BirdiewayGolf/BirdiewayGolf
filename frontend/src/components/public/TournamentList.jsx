import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { apiService } from '../../services/api';
import { toast } from 'react-toastify';
import { Calendar, MapPin, DollarSign, Building } from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const TournamentList = () => {
  const { league } = useParams();
  const [searchParams] = useSearchParams();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentLeague = league || searchParams.get('league');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await apiService.tournaments.getPublic(currentLeague);
        const tournamentsData = response.data?.data || [];
        setTournaments(Array.isArray(tournamentsData) ? tournamentsData : []);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        toast.error('Failed to load tournaments');
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [currentLeague]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Date not available';
    }
  };

  const getLeagueTitle = () => {
    if (!currentLeague) return 'All Tournaments';
    return `${currentLeague.charAt(0).toUpperCase() + currentLeague.slice(1)} League Tournaments`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading tournaments...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{getLeagueTitle()}</h1>

        {tournaments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No tournaments found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <div 
                key={tournament._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{tournament.name}</h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span>{formatDate(tournament.date)}</span>
                    </div>

                    {tournament.location && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span>{tournament.location}</span>
                      </div>
                    )}

                    {tournament.price !== undefined && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DollarSign className="w-5 h-5 text-gray-500" />
                        <span>Entry Fee: ${tournament.price}</span>
                      </div>
                    )}

                    {tournament.league && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Building className="w-5 h-5 text-gray-500" />
                        <span className="capitalize">{tournament.league} League</span>
                      </div>
                    )}
                  </div>

                  {tournament.description && (
                    <p className="mt-4 text-gray-600 line-clamp-2">
                      {tournament.description}
                    </p>
                  )}

                  <div className="mt-6">
                    <Link
                      to={`/tournaments/details/${tournament._id}`}
                      className="inline-block w-full text-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TournamentList;