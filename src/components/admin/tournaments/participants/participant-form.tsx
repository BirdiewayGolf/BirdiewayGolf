import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormError } from '@/components/ui/form-error';
import { FormButton } from '@/components/ui/form-button';
import type { Participant } from '@/lib/types/participant';

const participantSchema = z.object({
  name: z.string().min(2, 'Name is required'),
});

type ParticipantFormData = z.infer<typeof participantSchema>;

interface ParticipantFormProps {
  initialData?: Partial<Participant>;
  onSubmit: (data: ParticipantFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ParticipantForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ParticipantFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipantFormData>({
    resolver: zodResolver(participantSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.name?.message} />
      </div>

      <div className="flex space-x-4">
        <FormButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Saving..."
          className="flex-1"
        >
          {initialData ? 'Update Participant' : 'Add Participant'}
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