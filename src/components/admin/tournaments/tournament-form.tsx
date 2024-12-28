import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormError } from '@/components/ui/form-error';
import { FormButton } from '@/components/ui/form-button';
import type { Tournament } from '@/lib/types/tournament';

const tournamentSchema = z.object({
  name: z.string().min(3, 'Tournament name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(5, 'Location must be at least 5 characters'),
  type: z.enum(['business', 'junior', 'longday'] as const),
  courseType: z.enum(['9hole', '18hole'] as const),
  coursePar: z.number()
    .min(67, 'Course par must be at least 67')
    .max(73, 'Course par cannot exceed 73'),
});

type TournamentFormData = z.infer<typeof tournamentSchema>;

interface TournamentFormProps {
  onSubmit: (data: TournamentFormData) => void;
  initialData?: Partial<Tournament>;
  isSubmitting?: boolean;
  isEditing?: boolean;
}

export function TournamentForm({ 
  onSubmit, 
  initialData, 
  isSubmitting,
  isEditing = false 
}: TournamentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentFormData>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      ...initialData,
      date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tournament Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.name?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.description?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          {...register('date')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.date?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          {...register('location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.location?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">League Type</label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        >
          <option value="business">Business League</option>
          <option value="junior">Junior League</option>
          <option value="longday">Long Day Tournament</option>
        </select>
        <FormError message={errors.type?.message} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Type</label>
          <select
            {...register('courseType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
          >
            <option value="18hole">18 Holes</option>
            <option value="9hole">9 Holes</option>
          </select>
          <FormError message={errors.courseType?.message} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course Par</label>
          <input
            type="number"
            {...register('coursePar', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
          />
          <FormError message={errors.coursePar?.message} />
        </div>
      </div>

      <FormButton
        type="submit"
        isLoading={isSubmitting}
        loadingText={isEditing ? "Saving..." : "Creating..."}
        className="bg-[#0A5C36] hover:bg-[#0A5C36]/90"
      >
        {isEditing ? 'Save Changes' : 'Create Tournament'}
      </FormButton>
    </form>
  );
}