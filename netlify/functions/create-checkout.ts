import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async (event) => {
  // Handle preflight requests
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

    const { leagueType, price, ...formData } = JSON.parse(event.body);

    if (!leagueType || !price) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: `Missing required fields: ${!leagueType ? 'leagueType' : ''} ${!price ? 'price' : ''}`.trim() 
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
        ...formData,
      },
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ id: session.id }),
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