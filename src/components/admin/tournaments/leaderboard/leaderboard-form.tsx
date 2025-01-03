import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormError } from '@/components/ui/form-error';
import { FormButton } from '@/components/ui/form-button';
import type { LeaderboardEntry } from '@/lib/types/tournament';

const leaderboardSchema = z.object({
  playerName: z.string().min(2, 'Player/Team name is required'),
  score: z.number().min(0, 'Score must be 0 or greater'),
});

type LeaderboardFormData = z.infer<typeof leaderboardSchema>;

interface LeaderboardFormProps {
  initialData?: LeaderboardEntry | null;
  onSubmit: (data: LeaderboardFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  coursePar: number;
}

export function LeaderboardForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  coursePar,
}: LeaderboardFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LeaderboardFormData>({
    resolver: zodResolver(leaderboardSchema),
    defaultValues: {
      playerName: initialData?.playerName || '',
      score: initialData?.score || 0,
    },
  });

  // Watch the score field to calculate relative to par in real-time
  const score = watch('score', initialData?.score || 0);
  const relativeToPar = score - coursePar;
  const relativeToParDisplay = relativeToPar === 0 ? 'E' : relativeToPar > 0 ? `+${relativeToPar}` : relativeToPar;

  const handleFormSubmit = (data: LeaderboardFormData) => {
    // Add the relativeToPar calculation to the submitted data
    const submitData = {
      ...data,
      relativeToPar,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Player/Team Name</label>
        <input
          type="text"
          {...register('playerName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.playerName?.message} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Score</label>
        <input
          type="number"
          {...register('score', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          min={0}
        />
        <FormError message={errors.score?.message} />
        {score > 0 && (
          <div className="mt-2 text-sm">
            <p className="text-gray-600">Course Par: {coursePar}</p>
            <p className={`font-medium ${
              relativeToPar === 0 ? 'text-gray-900' :
              relativeToPar > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              Relative to par: {relativeToParDisplay}
            </p>
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <FormButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Saving..."
          className="flex-1"
        >
          {initialData ? 'Update Score' : 'Add Score'}
        </FormButton>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}