import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const StandingsManager = ({ league = 'business', season = '2024' }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(league);
  const [error, setError] = useState(null);
  const [newEntry, setNewEntry] = useState({
    playerName: '',
    totalPoints: '',
    averageScore: '',
    league: selectedLeague
  });

  useEffect(() => {
    fetchStandings();
  }, [selectedLeague]);

  const fetchStandings = async () => {
    try {
      setLoading(true);
      const response = await apiService.standings.getAdminStandings(selectedLeague, season);
      if (response.data.success) {
        const leagueStandings = response.data.data.filter(
          standing => standing.league === selectedLeague
        );
        setStandings(leagueStandings);
      }
    } catch (error) {
      console.error('Error fetching standings:', error);
      setError('Failed to load standings');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = () => {
    if (!newEntry.playerName || !newEntry.totalPoints) return;
    
    const updatedStandings = [
      ...standings,
      {
        ...newEntry,
        league: selectedLeague,
        totalPoints: Number(newEntry.totalPoints),
        averageScore: Number(newEntry.averageScore) || 0
      }
    ];

    setStandings(updatedStandings);
    setNewEntry({ playerName: '', totalPoints: '', averageScore: '', league: selectedLeague });
  };

  const handleUpdateEntry = (index, field, value) => {
    const updatedStandings = [...standings];
    updatedStandings[index] = {
      ...updatedStandings[index],
      [field]: field === 'playerName' ? value : Number(value)
    };
    setStandings(updatedStandings);
  };

  const handleRemoveEntry = (index) => {
    setStandings(standings.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await apiService.standings.updateStandings(selectedLeague, season, { 
        standings: standings.map(s => ({ ...s, league: selectedLeague }))
      });
      if (response.data.success) {
        setError(null);
      }
    } catch (error) {
      console.error('Error saving standings:', error);
      setError('Failed to save standings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white rounded-lg shadow p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-emerald-800">League Standings Manager</h2>
        <div className="mt-2">
          <select 
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="input"
          >
            <option value="business">Business League</option>
            <option value="junior">Junior League</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {/* Add New Entry Form */}
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              className="input"
              placeholder="Player/Team Name"
              value={newEntry.playerName}
              onChange={(e) => setNewEntry({ ...newEntry, playerName: e.target.value })}
            />
          </div>
          <div className="w-20">
            <input
              type="number"
              className="input"
              placeholder="Points"
              value={newEntry.totalPoints}
              onChange={(e) => setNewEntry({ ...newEntry, totalPoints: e.target.value })}
            />
          </div>
          <div className="w-20">
            <input
              type="number"
              className="input"
              placeholder="Average"
              value={newEntry.averageScore}
              onChange={(e) => setNewEntry({ ...newEntry, averageScore: e.target.value })}
            />
          </div>
          <button 
            onClick={handleAddEntry}
            className="btn-primary"
          >
            Add
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {loading && (
          <div className="text-center text-sm text-emerald-700">Loading...</div>
        )}

        {/* Standings Table */}
        <div className="overflow-x-auto bg-white rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-50">
                <th className="text-left p-2 text-emerald-800 text-sm">Position</th>
                <th className="text-left p-2 text-emerald-800 text-sm">Player/Team</th>
                <th className="text-right p-2 text-emerald-800 text-sm">Points</th>
                <th className="text-right p-2 text-emerald-800 text-sm">Average</th>
                <th className="text-right p-2 text-emerald-800 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {standings
                .sort((a, b) => b.totalPoints - a.totalPoints)
                .map((standing, index) => (
                <tr key={index} className="border-b hover:bg-emerald-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="input"
                      value={standing.playerName}
                      onChange={(e) => handleUpdateEntry(index, 'playerName', e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="input w-20"
                      value={standing.totalPoints}
                      onChange={(e) => handleUpdateEntry(index, 'totalPoints', e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="input w-20"
                      value={standing.averageScore}
                      onChange={(e) => handleUpdateEntry(index, 'averageScore', e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <button 
                      onClick={() => handleRemoveEntry(index)}
                      className="btn-secondary text-red-500 border-red-500 hover:bg-red-50 text-sm py-1"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-2">
          <button 
            onClick={handleSave}
            disabled={loading}
            className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StandingsManager;