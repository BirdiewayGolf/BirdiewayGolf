import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { TournamentActions } from './tournament-actions';
import type { Tournament } from '@/lib/types/tournament';

interface TournamentListItemProps {
  tournament: Tournament;
}

export function TournamentListItem({ tournament }: TournamentListItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">{tournament.name}</h3>
              <TournamentActions tournament={tournament} />
            </div>
            
            <p className="mt-2 text-gray-600">{tournament.description}</p>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 text-[#C5A572] mr-2" />
                <span>{new Date(tournament.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 text-[#C5A572] mr-2" />
                <span>{tournament.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 text-[#C5A572] mr-2" />
                <span>{tournament.pairings?.length || 0} Groups</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}