import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('business');
  const currentSeason = '2024';

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        const response = await apiService.standings.getLeagueStandings(selectedLeague, currentSeason);
        if (response.data.success) {
          const leagueStandings = response.data.data.filter(
            standing => standing.league === selectedLeague
          );
          setStandings(leagueStandings);
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
        setError('Unable to load standings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
  }, [selectedLeague]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading standings...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-600 text-lg">{error}</div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-emerald-800">League Standings</h1>
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                  className="rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="business">Business League</option>
                  <option value="junior">Junior League</option>
                </select>
              </div>
            </div>

            {standings.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No standings available for {selectedLeague} league
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="text-left p-4 text-emerald-800 font-semibold">Position</th>
                      <th className="text-left p-4 text-emerald-800 font-semibold">Player/Team</th>
                      <th className="text-right p-4 text-emerald-800 font-semibold">Points</th>
                      <th className="text-right p-4 text-emerald-800 font-semibold">Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings
                      .sort((a, b) => b.totalPoints - a.totalPoints)
                      .map((standing, index) => (
                        <tr
                          key={standing._id || standing.playerName}
                          className="border-b hover:bg-emerald-50 transition-colors"
                        >
                          <td className="p-4">{index + 1}</td>
                          <td className="p-4 font-medium">{standing.playerName}</td>
                          <td className="p-4 text-right">{standing.totalPoints}</td>
                          <td className="p-4 text-right">
                            {typeof standing.averageScore === 'number'
                              ? standing.averageScore.toFixed(1)
                              : '-'
                            }
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {renderContent()}
      <Footer />
    </>
  );
};

export default Standings;