// netlify/functions/contact.ts
import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  secure: true,
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !phone || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'All fields are required' }),
      };
    }

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A5C36;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3 style="color: #0A5C36;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error sending email', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
    };
  }
};