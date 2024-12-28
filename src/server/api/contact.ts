import { EmailService } from '../services/email';
import type { ContactFormData } from '@/lib/types/contact';

export async function handleContact(req: Request) {
  try {
    const data = await req.json() as ContactFormData;
    
    await EmailService.sendEmail({
      to: import.meta.env.VITE_EMAIL_ADDRESS,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A5C36;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <h3 style="color: #0A5C36;">Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send message'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}