interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const baseUrl = import.meta.env.PROD 
      ? 'https://birdiewaygolf.onrender.com' 
      : 'http://localhost:5174';
      
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
