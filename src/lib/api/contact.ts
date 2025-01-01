import type { ContactFormData, ContactResponse } from '../types/contact';

export async function sendContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message');
    }

    return {
      success: true
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message'
    };
  }
}