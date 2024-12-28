import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import type { Tournament } from '@/lib/types/tournament';

interface TournamentDetailsHeaderProps {
  tournament: Tournament;
  onUpdatePar: (newPar: number) => void;
}

export function TournamentDetailsHeader({ tournament, onUpdatePar }: TournamentDetailsHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [coursePar, setCoursePar] = useState(tournament.coursePar || 72);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coursePar < 67 || coursePar > 73) {
      alert('Course par must be between 67 and 73');
      return;
    }
    onUpdatePar(coursePar);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{tournament.name}</h2>
        <p className="text-sm text-gray-500">
          {new Date(tournament.date).toLocaleDateString()} • {tournament.location}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          Course Par: {' '}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="inline-flex items-center space-x-2">
              <input
                type="number"
                value={coursePar}
                onChange={(e) => setCoursePar(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded-md"
                min={67}
                max={73}
              />
              <button
                type="submit"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setCoursePar(tournament.coursePar || 72);
                  setIsEditing(false);
                }}
                className="text-gray-500 hover:text-gray-600 text-sm font-medium"
              >
                Cancel
              </button>
            </form>
          ) : (
            <span className="font-medium">{tournament.coursePar || 72}</span>
          )}
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600"
            title="Edit course par"
          >
            <Settings className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}