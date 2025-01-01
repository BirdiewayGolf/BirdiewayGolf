import { Handler, HandlerEvent } from '@netlify/functions';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia'
});

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : process.env.URL || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Credentials': 'true'
};

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  secure: true
});

const generateEmailContent = (formData: any, leagueType: string) => {
  let content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0A5C36;">New ${leagueType.charAt(0).toUpperCase() + leagueType.slice(1)} League Registration</h2>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
  `;

  // Add league-specific content
  switch (leagueType) {
    case 'junior':
      content += `
        <h3>Player Information</h3>
        <p><strong>Player Name:</strong> ${formData.playerName}</p>
        <p><strong>Date of Birth:</strong> ${formData.dateOfBirth}</p>
        <p><strong>Shirt Size:</strong> ${formData.shirtSize}</p>
        <h3>Parent Information</h3>
        <p><strong>Parent Name:</strong> ${formData.parentName}</p>
        <p><strong>Parent Email:</strong> ${formData.parentEmail}</p>
        <p><strong>Parent Phone:</strong> ${formData.parentPhone}</p>
      `;
      break;
    case 'business':
      content += `
        <p><strong>Team Name:</strong> ${formData.teamName}</p>
        <p><strong>Company Name:</strong> ${formData.companyName}</p>
        <p><strong>Contact Name:</strong> ${formData.contactName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
      `;
      break;
    case 'longday':
      content += Object.keys(formData)
        .filter(key => key.startsWith('player'))
        .map(key => `
          <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
          <p><strong>Name:</strong> ${formData[key].name}</p>
          <p><strong>Email:</strong> ${formData[key].email}</p>
          <p><strong>Phone:</strong> ${formData[key].phone}</p>
          <p><strong>Shirt Size:</strong> ${formData[key].shirtSize}</p>
        `).join('');
      break;
  }

  content += `
      </div>
    </div>
  `;
  return content;
};

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    if (!event.body) {
      throw new Error('Request body is empty');
    }

    const { leagueType, price, formData } = JSON.parse(event.body);

    if (!leagueType || !price) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Missing required fields: leagueType and price are required'
        }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${leagueType.charAt(0).toUpperCase() + leagueType.slice(1)} League Registration`,
              description: `Registration for ${leagueType} league`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL || 'http://localhost:5173'}/registration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'http://localhost:5173'}/registration/cancel`,
      metadata: {
        leagueType,
        registrationData: JSON.stringify(formData)
      },
      customer_email: formData.email || formData.parentEmail || formData.player1?.email,
    });

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      subject: `New ${leagueType} League Registration`,
      html: generateEmailContent(formData, leagueType)
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        id: session.id,
        url: session.url
      }),
    };
  } catch (error) {
    console.error('Checkout error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};