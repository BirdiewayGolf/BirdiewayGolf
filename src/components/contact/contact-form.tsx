// src/components/contact/contact-form.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormButton } from '../ui/form-button';
import { FormError } from '../ui/form-error';
import { sendContactForm } from '@/lib/services/contact';
import { validateEmail, validatePhone, formatPhoneNumber } from '@/lib/utils/validation';

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
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
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      setErrorMessage('');

      if (!validateEmail(data.email)) {
        throw new Error('Invalid email address format');
      }

      if (!validatePhone(data.phone)) {
        throw new Error('Invalid phone number format');
      }

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
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm"
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-[#0A5C36] focus:ring-[#0A5C36] 
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        />
        <FormError message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-[#0A5C36] focus:ring-[#0A5C36]
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        />
        <FormError message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-[#0A5C36] focus:ring-[#0A5C36]
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="(123) 456-7890"
          disabled={isSubmitting}
        />
        <FormError message={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-[#0A5C36] focus:ring-[#0A5C36]
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        />
        <FormError message={errors.message?.message} />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 text-green-700 rounded-md">
          Message sent successfully! We will get back to you soon.
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
        disabled={isSubmitting}
        className="w-full bg-[#0A5C36] hover:bg-[#0A5C36]/90 
                  text-white font-medium py-2 px-4 rounded-md
                  transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send Message
      </FormButton>
    </form>
  );
}