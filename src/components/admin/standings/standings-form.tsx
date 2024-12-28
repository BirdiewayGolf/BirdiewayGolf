import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { StandingsEntry, LeagueType } from '@/lib/types/standings';
import { FormError } from '@/components/ui/form-error';
import { FormButton } from '@/components/ui/form-button';

const standingsSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  playerNames: z.string().min(2, 'Player name(s) required'),
  totalPoints: z.number().min(0, 'Points must be 0 or greater'),
  scoringAverage: z.number().min(0, 'Average must be 0 or greater').max(100, 'Average cannot exceed 100'),
});

type StandingsFormData = z.infer<typeof standingsSchema>;

interface StandingsFormProps {
  initialData?: Partial<StandingsEntry>;
  onSubmit: (data: StandingsFormData) => void;
  onCancel?: () => void;
  leagueType: LeagueType;
  isSubmitting?: boolean;
}

export function StandingsForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  isSubmitting = false 
}: StandingsFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StandingsFormData>({
    resolver: zodResolver(standingsSchema),
    defaultValues: initialData,
  });

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          {...register('teamName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Enter team name"
        />
        <FormError message={errors.teamName?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Player Name(s)</label>
        <input
          type="text"
          {...register('playerNames')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Enter player name(s), comma separated"
        />
        <FormError message={errors.playerNames?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Total Points</label>
        <input
          type="number"
          {...register('totalPoints', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="0"
        />
        <FormError message={errors.totalPoints?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Scoring Average</label>
        <input
          type="number"
          step="0.01"
          {...register('scoringAverage', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="0.00"
        />
        <FormError message={errors.scoringAverage?.message} />
      </div>

      <div className="flex space-x-4">
        <FormButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Saving..."
          className="flex-1"
        >
          {initialData ? 'Save Changes' : 'Add Entry'}
        </FormButton>

        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}