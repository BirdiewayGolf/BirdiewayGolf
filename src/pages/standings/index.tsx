import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStandingsStore } from '@/lib/stores/standings-store';
import { StandingsView } from '@/components/standings/standings-view';
import { LeagueSelector } from '@/components/standings/league-selector';
import type { LeagueType } from '@/lib/types/standings';

export function Standings() {
  const { leagueType } = useParams<{ leagueType?: string }>();
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState<LeagueType>(
    (leagueType as LeagueType) || 'business'
  );
  
  const getStandingsByLeague = useStandingsStore((state) => state.getStandingsByLeague);
  const standings = getStandingsByLeague(selectedLeague);

  useEffect(() => {
    if (leagueType && (leagueType !== 'business' && leagueType !== 'junior')) {
      navigate('/standings/business', { replace: true });
    }
  }, [leagueType, navigate]);

  const handleLeagueChange = (league: LeagueType) => {
    setSelectedLeague(league);
    navigate(`/standings/${league}`);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          League Standings
        </h1>
        
        <LeagueSelector
          selectedLeague={selectedLeague}
          onLeagueChange={handleLeagueChange}
        />

        {standings.length > 0 ? (
          <StandingsView standings={standings} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No standings available for this league yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}