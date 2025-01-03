interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  error?: string;
  data?: any;
}

// This is the interface needed by the registration service
interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://www.birdiewaygolf.com'
      : 'http://localhost:5174';
    
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Contact form error:', responseData);
      throw new Error(responseData.error || 'Failed to send message');
    }

    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message'
    };
  }
};

// Add the sendEmail function that registration.ts is trying to import
export async function sendEmail(data: EmailData): Promise<{ success: boolean }> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://www.birdiewaygolf.com'
      : 'http://localhost:5174';
    
    const response = await fetch(`${baseUrl}/.netlify/functions/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}