import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { sessionId } = JSON.parse(event.body || '');
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        amount: session.amount_total,
        league: session.metadata?.leagueType,
        email: session.customer_email,
      }),
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to verify payment' }),
    };
  }
};