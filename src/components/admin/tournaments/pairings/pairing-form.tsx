import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormError } from '@/components/ui/form-error';
import { FormButton } from '@/components/ui/form-button';
import type { TournamentPairing } from '@/lib/types/tournament';

const pairingSchema = z.object({
  groupNumber: z.number().min(1, 'Group number is required'),
  players: z.array(z.string()).min(1, 'At least one player is required'),
  teeTime: z.string().min(1, 'Tee time is required'),
  startingHole: z.number().min(1, 'Starting hole must be between 1 and 18').max(18),
  totalGroupScore: z.number().optional(),
});

type PairingFormData = z.infer<typeof pairingSchema>;

interface PairingFormProps {
  initialData?: Partial<TournamentPairing>;
  onSubmit: (data: PairingFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function PairingForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: PairingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PairingFormData>({
    resolver: zodResolver(pairingSchema),
    defaultValues: {
      ...initialData,
      players: initialData?.players || [''],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Group Number</label>
        <input
          type="number"
          {...register('groupNumber', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          min={1}
        />
        <FormError message={errors.groupNumber?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Players</label>
        <div className="space-y-2">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              {...register(`players.${index}`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder={`Player ${index + 1}`}
            />
          ))}
        </div>
        <FormError message={errors.players?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tee Time</label>
        <input
          type="time"
          {...register('teeTime')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.teeTime?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Starting Hole</label>
        <input
          type="number"
          {...register('startingHole', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          min={1}
          max={18}
        />
        <FormError message={errors.startingHole?.message} />
      </div>

      <div className="flex space-x-4">
        <FormButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Saving..."
          className="flex-1"
        >
          {initialData ? 'Update Pairing' : 'Add Pairing'}
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