import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { StandingsForm } from '@/components/admin/standings/standings-form';
import { StandingsTable } from '@/components/admin/standings/standings-table';
import { useStandingsStore } from '@/lib/stores/standings-store';
import { useToast } from '@/lib/hooks/use-toast';
import type { StandingsEntry, LeagueType } from '@/lib/types/standings';

export function AdminStandings() {
  const [selectedLeague, setSelectedLeague] = useState<LeagueType>('business');
  const [editingEntry, setEditingEntry] = useState<StandingsEntry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addEntry, updateEntry, deleteEntry, getStandingsByLeague } = useStandingsStore();
  const { toast, showToast } = useToast();

  const standings = getStandingsByLeague(selectedLeague);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Ensure leagueType is set correctly
      const standingsData = {
        ...data,
        leagueType: selectedLeague,
      };
      
      if (editingEntry) {
        updateEntry(editingEntry.id, standingsData);
        showToast('Standings updated successfully', 'success');
      } else {
        addEntry(standingsData);
        showToast('New entry added successfully', 'success');
      }
      
      setEditingEntry(null);
    } catch (error) {
      showToast('Failed to save standings', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (entry: StandingsEntry) => {
    setEditingEntry(entry);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      try {
        deleteEntry(id);
        showToast('Entry deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete entry', 'error');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const handleLeagueChange = (league: LeagueType) => {
    setSelectedLeague(league);
    setEditingEntry(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Standings Management</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => handleLeagueChange('business')}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedLeague === 'business'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Business League
            </button>
            <button
              onClick={() => handleLeagueChange('junior')}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedLeague === 'junior'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Junior League
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {standings.length > 0 ? (
                <StandingsTable
                  standings={standings}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No standings entries yet.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Use the form to add your first entry.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {editingEntry ? 'Edit Entry' : 'Add New Entry'}
            </h2>
            <StandingsForm
              initialData={editingEntry || undefined}
              onSubmit={handleSubmit}
              onCancel={editingEntry ? handleCancelEdit : undefined}
              leagueType={selectedLeague}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}