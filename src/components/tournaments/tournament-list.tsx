import React from 'react';
import { TournamentCard } from './tournament-card';
import type { Tournament, TournamentType } from '@/lib/types/tournament';

interface TournamentListProps {
  tournaments: Tournament[];
  leagueType: TournamentType;
}

export function TournamentList({ tournaments, leagueType }: TournamentListProps) {
  // Filter tournaments by league type and visibility
  const filteredTournaments = tournaments
    .filter(tournament => 
      tournament.type === leagueType && 
      (tournament.isVisible ?? true)
    )
    // Sort tournaments by date, with upcoming tournaments first
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-12">
      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No tournaments found for this league type.
        </div>
      )}
    </div>
  );
}