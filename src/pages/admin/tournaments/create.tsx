import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { TournamentForm } from '@/components/admin/tournaments/tournament-form';
import { useTournamentStore } from '@/lib/stores/tournament-store';

export function CreateTournament() {
  const navigate = useNavigate();
  const addTournament = useTournamentStore((state) => state.addTournament);

  const handleSubmit = async (data: any) => {
    try {
      addTournament(data);
      // Redirect to tournament list after successful creation
      navigate('/admin/tournaments');
    } catch (error) {
      console.error('Failed to create tournament:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Tournament</h1>
        <TournamentForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
}