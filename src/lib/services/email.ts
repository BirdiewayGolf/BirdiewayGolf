interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactForm = async (data: ContactFormData) => {
  try {
    const baseUrl = import.meta.env.PROD 
      ? 'https://birdiewaygolf.onrender.com/api/contact' 
      : 'http://localhost:5174/api/contact';
      
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    return {
      success: true,
      data: await response.json()
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message'
    };
  }
};
