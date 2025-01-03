import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { TournamentForm } from '@/components/admin/tournaments/tournament-form';
import { LeaderboardForm } from '@/components/admin/tournaments/leaderboard/leaderboard-form';
import { LeaderboardTable } from '@/components/admin/tournaments/leaderboard/leaderboard-table';
import { PairingForm } from '@/components/admin/tournaments/pairings/pairing-form';
import { PairingsTable } from '@/components/admin/tournaments/pairings/pairings-table';
import { ParticipantForm } from '@/components/admin/tournaments/participants/participant-form';
import { ParticipantList } from '@/components/admin/tournaments/participants/participant-list';
import { useTournamentStore } from '@/lib/stores/tournament-store';
import type { 
  LeaderboardEntry, 
  TournamentPairing, 
  Participant, 
  Tournament 
} from '@/lib/types/tournament';

type ActiveTab = 'details' | 'leaderboard' | 'pairings' | 'participants';

export function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingLeaderboardEntry, setEditingLeaderboardEntry] = useState<LeaderboardEntry | null>(null);
  const [editingPairing, setEditingPairing] = useState<TournamentPairing | null>(null);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  
  const { getTournamentById, updateTournament } = useTournamentStore();
  const tournament = getTournamentById(id!);

  if (!tournament) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Tournament not found</p>
          <button
            onClick={() => navigate('/admin/tournaments')}
            className="mt-4 text-[#0A5C36] hover:text-[#0A5C36]/80"
          >
            Return to Tournaments
          </button>
        </div>
      </AdminLayout>
    );
  }

  const handleSubmit = async (data: Partial<Tournament>) => {
    try {
      setIsSubmitting(true);
      updateTournament(tournament.id, {
        ...tournament,
        ...data,
        isVisible: data.isVisible ?? tournament.isVisible ?? true,
      });
      navigate('/admin/tournaments');
    } catch (error) {
      console.error('Failed to update tournament:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLeaderboardSubmit = async (data: { 
    playerName: string; 
    score: number; 
  }) => {
    try {
      setIsSubmitting(true);
      const relativeToPar = data.score - tournament.coursePar;
      
      if (editingLeaderboardEntry) {
        const updatedLeaderboard = (tournament.leaderboard || []).map(entry =>
          entry.id === editingLeaderboardEntry.id
            ? { 
                ...entry, 
                playerName: data.playerName, 
                score: data.score,
                relativeToPar,
                // Preserve existing playerId
                playerId: entry.playerId || crypto.randomUUID()
              }
            : entry
        );
        updateTournament(tournament.id, { leaderboard: updatedLeaderboard });
      } else {
        const newEntry: LeaderboardEntry = {
          id: crypto.randomUUID(),
          playerId: crypto.randomUUID(),
          playerName: data.playerName,
          score: data.score,
          relativeToPar,
        };
        updateTournament(tournament.id, {
          leaderboard: [...(tournament.leaderboard || []), newEntry],
        });
      }
      setEditingLeaderboardEntry(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePairingSubmit = async (data: { 
    time: string; 
    players: string[] 
  }) => {
    try {
      setIsSubmitting(true);
      
      if (editingPairing) {
        const updatedPairings = tournament.pairings.map(pairing =>
          pairing.id === editingPairing.id 
            ? { 
                ...pairing, 
                time: data.time,
                players: data.players
              } 
            : pairing
        );
        updateTournament(tournament.id, { pairings: updatedPairings });
      } else {
        const newPairing: TournamentPairing = {
          id: crypto.randomUUID(),
          time: data.time,
          players: data.players,
        };
        updateTournament(tournament.id, {
          pairings: [...tournament.pairings, newPairing],
        });
      }
      setEditingPairing(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleParticipantSubmit = (data: { 
    name: string; 
    email?: string | undefined; 
    phone?: string | undefined 
  }) => {
    try {
      setIsSubmitting(true);
      
      if (editingParticipant) {
        const updatedParticipants = (tournament.participants || []).map(participant =>
          participant.id === editingParticipant.id 
            ? { 
                ...participant, 
                name: data.name,
                email: data.email || '',
                phone: data.phone || '',
                updatedAt: new Date().toISOString()
              } 
              : participant
        );
        updateTournament(tournament.id, { participants: updatedParticipants });
      } else {
        const newParticipant: Participant = {
          id: crypto.randomUUID(),
          name: data.name,
          email: data.email || '',
          phone: data.phone || '',
          tournamentId: tournament.id,
          createdAt: new Date().toISOString(),
        };
        updateTournament(tournament.id, {
          participants: [...(tournament.participants || []), newParticipant],
        });
      }
      setEditingParticipant(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/tournaments')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Tournament Management</h1>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['details', 'leaderboard', 'pairings', 'participants'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as ActiveTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-[#0A5C36] text-[#0A5C36]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          {activeTab === 'details' && (
            <TournamentForm
              initialData={tournament}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isEditing={true}
            />
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              <LeaderboardForm
                initialData={editingLeaderboardEntry}
                onSubmit={handleLeaderboardSubmit}
                onCancel={() => setEditingLeaderboardEntry(null)}
                isSubmitting={isSubmitting}
                coursePar={tournament.coursePar}
              />
              <LeaderboardTable
                entries={tournament.leaderboard || []}
                onEdit={(entry: LeaderboardEntry) => setEditingLeaderboardEntry(entry)}
                onDelete={(id) => {
                  const updatedLeaderboard = (tournament.leaderboard || [])
                    .filter(entry => entry.id !== id);
                  updateTournament(tournament.id, { leaderboard: updatedLeaderboard });
                }}
              />
            </div>
          )}

          {activeTab === 'pairings' && (
            <div className="space-y-6">
              <PairingForm
                initialData={editingPairing}
                onSubmit={handlePairingSubmit}
                onCancel={() => setEditingPairing(null)}
                isSubmitting={isSubmitting}
              />
              <PairingsTable
                pairings={tournament.pairings}
                onEdit={(pairing: TournamentPairing) => setEditingPairing(pairing)}
                onDelete={(id) => {
                  const updatedPairings = tournament.pairings
                    .filter(pairing => pairing.id !== id);
                  updateTournament(tournament.id, { pairings: updatedPairings });
                }}
              />
            </div>
          )}

          {activeTab === 'participants' && (
            <div className="space-y-6">
              <ParticipantForm
                initialData={editingParticipant}
                onSubmit={handleParticipantSubmit}
                onCancel={() => setEditingParticipant(null)}
                isSubmitting={isSubmitting}
              />
              <ParticipantList
                participants={tournament.participants || []}
                onEdit={(participant: Participant) => setEditingParticipant(participant)}
                onDelete={(id) => {
                  const updatedParticipants = (tournament.participants || [])
                    .filter(participant => participant.id !== id);
                  updateTournament(tournament.id, { participants: updatedParticipants });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}