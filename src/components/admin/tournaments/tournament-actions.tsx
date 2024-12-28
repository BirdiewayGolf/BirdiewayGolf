import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTournamentStore } from '@/lib/stores/tournament-store';
import type { Tournament } from '@/lib/types/tournament';

interface TournamentActionsProps {
  tournament: Tournament;
}

export function TournamentActions({ tournament }: TournamentActionsProps) {
  const navigate = useNavigate();
  const deleteTournament = useTournamentStore((state) => state.deleteTournament);

  const handleEdit = () => {
    navigate(`/admin/tournaments/${tournament.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this tournament? This action cannot be undone.')) {
      deleteTournament(tournament.id);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleEdit}
        className="p-2 text-[#0A5C36] hover:bg-[#0A5C36]/10 rounded-lg transition-colors"
        title="Edit tournament"
      >
        <Edit2 className="h-5 w-5" />
      </button>
      <button
        onClick={handleDelete}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete tournament"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}