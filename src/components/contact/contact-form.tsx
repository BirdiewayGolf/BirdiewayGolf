import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormButton } from '../ui/form-button';
import { FormError } from '../ui/form-error';
import { sendContactForm } from '@/lib/api/contact';
import { validateEmail, validatePhone, formatPhoneNumber } from '@/lib/utils/validation';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      setErrorMessage('');

      // Validate email and phone
      if (!validateEmail(data.email)) {
        throw new Error('Invalid email address');
      }
      if (!validatePhone(data.phone)) {
        throw new Error('Invalid phone number');
      }

      // Format the phone number
      const formattedData = {
        ...data,
        phone: formatPhoneNumber(data.phone),
      };

      const response = await sendContactForm(formattedData);

      if (!response.success) {
        throw new Error(response.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.name?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.email?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
          placeholder="(123) 456-7890"
        />
        <FormError message={errors.phone?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          {...register('message')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A5C36] focus:ring-[#0A5C36]"
        />
        <FormError message={errors.message?.message} />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 text-green-700 rounded-md">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      <FormButton
        type="submit"
        isLoading={isSubmitting}
        loadingText="Sending..."
        className="bg-[#0A5C36] hover:bg-[#0A5C36]/90"
      >
        Send Message
      </FormButton>
    </form>
  );
}