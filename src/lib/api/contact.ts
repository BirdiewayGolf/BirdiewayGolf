import type { ContactFormData } from '@/lib/types/contact';

export async function sendContactForm(data: ContactFormData): Promise<{ success: boolean }> {
  try {
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

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send message'
    };
  }
}