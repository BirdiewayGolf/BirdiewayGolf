import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormError } from '@/components/ui/form-error';
import { FormButton } from '@/components/ui/form-button';
import type { LeaderboardEntry } from '@/lib/types/tournament';

const leaderboardSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  playerNames: z.array(z.string()).min(1, 'At least one player is required'),
  score: z.number().min(0, 'Score must be 0 or greater'),
});

type LeaderboardFormData = z.infer<typeof leaderboardSchema>;

interface LeaderboardFormProps {
  initialData?: Partial<LeaderboardEntry>;
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
      ...initialData,
      playerNames: initialData?.playerNames || [''],
    },
  });

  // Watch the score field to calculate relative to par in real-time
  const score = watch('score', initialData?.score || 0);
  const relativeToPar = score - coursePar;
  const relativeToParDisplay = relativeToPar === 0 ? 'E' : relativeToPar > 0 ? `+${relativeToPar}` : relativeToPar;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Team/Player Name</label>
        <input
          type="text"
          {...register('teamName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.teamName?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Players</label>
        <div className="space-y-2">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              {...register(`playerNames.${index}`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder={`Player ${index + 1}`}
            />
          ))}
        </div>
        <FormError message={errors.playerNames?.message} />
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