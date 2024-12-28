import React from 'react';
import { Users } from 'lucide-react';
import type { Participant } from '@/lib/types/tournament';

interface ParticipantsViewProps {
  participants: Participant[];
}

export function ParticipantsView({ participants }: ParticipantsViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-[#C5A572] mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Tournament Participants</h3>
        </div>
      </div>

      {participants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {participants.map((participant) => (
            <div 
              key={participant.id}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900">{participant.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No participants registered yet
        </div>
      )}
    </div>
  );
}