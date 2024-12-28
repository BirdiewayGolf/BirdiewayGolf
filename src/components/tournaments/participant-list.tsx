import React from 'react';
import { useParticipantStore } from '@/lib/stores/participant-store';

interface ParticipantListProps {
  tournamentId: string;
}

export function ParticipantList({ tournamentId }: ParticipantListProps) {
  const getParticipantsByTournament = useParticipantStore(
    (state) => state.getParticipantsByTournament
  );
  const participants = getParticipantsByTournament(tournamentId);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Participants</h3>
      </div>
      {participants.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {participants.map((participant) => (
            <li key={participant.id} className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{participant.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No participants registered yet.</p>
        </div>
      )}
    </div>
  );
}