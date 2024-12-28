import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers }
      );
    }

    await sendEmail({ name, email, phone, message });

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers }
    );
  }
}