import { ContactFormData } from '../types/contact';

interface ContactResponse {
  success: boolean;
  error?: string;
  message?: string;
}

export async function sendContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // Remove the abort controller as it's causing issues
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Message sent successfully'
    };
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message'
    };
  }
}