import React, { useState } from 'react';
import { ParticipantForm } from './participant-form';
import { ParticipantList } from './participant-list';
import { useParticipantStore } from '@/lib/stores/participant-store';
import type { Tournament } from '@/lib/types/tournament';
import type { Participant } from '@/lib/types/participant';

interface ParticipantSectionProps {
  tournament: Tournament;
}

export function ParticipantSection({ tournament }: ParticipantSectionProps) {
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    addParticipant, 
    updateParticipant, 
    deleteParticipant,
    getParticipantsByTournament 
  } = useParticipantStore();

  const participants = getParticipantsByTournament(tournament.id);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      if (editingParticipant) {
        updateParticipant(editingParticipant.id, data);
      } else {
        addParticipant({
          ...data,
          tournamentId: tournament.id,
        });
      }
      
      setEditingParticipant(null);
    } catch (error) {
      console.error('Error saving participant:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (participant: Participant) => {
    setEditingParticipant(participant);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this participant?')) {
      deleteParticipant(id);
    }
  };

  const handleCancel = () => {
    setEditingParticipant(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">
                Tournament Participants
              </h3>
            </div>
            {participants.length > 0 ? (
              <ParticipantList
                participants={participants}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No participants registered yet.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Use the form to add participants.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingParticipant ? 'Edit Participant' : 'Add New Participant'}
          </h2>
          <ParticipantForm
            tournamentType={tournament.type}
            initialData={editingParticipant || undefined}
            onSubmit={handleSubmit}
            onCancel={editingParticipant ? handleCancel : undefined}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}