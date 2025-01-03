import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormError } from '@/components/ui/form-error';
import { FormButton } from '@/components/ui/form-button';
import type { Participant } from '@/lib/types/tournament';

const participantSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
});

type ParticipantFormData = z.infer<typeof participantSchema>;

interface ParticipantFormProps {
  initialData?: Participant | null;
  onSubmit: (data: { 
    name: string; 
    email?: string; 
    phone?: string 
  }) => void;
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
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
    },
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
      <div>
        <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.email?.message} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
        <input
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        <FormError message={errors.phone?.message} />
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