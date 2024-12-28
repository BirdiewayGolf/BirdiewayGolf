import React from 'react';
import { TournamentCard } from './tournament-card';
import type { Tournament } from '@/lib/types/tournament';

interface TournamentListProps {
  tournaments: Tournament[];
  leagueType: 'business' | 'junior' | 'longday';
}

export function TournamentList({ tournaments, leagueType }: TournamentListProps) {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-8">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
}