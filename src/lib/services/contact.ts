// src/lib/services/contact.ts
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendContactForm(data: ContactFormData) {
  const response = await fetch('/.netlify/functions/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to send message');
  }

  return response.json();
}