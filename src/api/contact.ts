import type { ContactFormData } from '@/lib/types/contact';

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean }> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || error.error || 'Failed to send message');
  }

  return response.json();
}