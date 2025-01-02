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

export const sendContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
  try {
    // Get the base URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production'
      ? `${window.location.origin}`  // This will use the current domain
      : 'http://localhost:3000';     // Your local server port

    console.log('Sending contact form to:', `${baseUrl}/api/contact`);

    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    console.log('Response status:', response.status);

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