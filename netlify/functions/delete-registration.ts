import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia'
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Content-Type': 'application/json'
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false,
        error: 'Method not allowed' 
      })
    };
  }

  const id = event.path?.split('/').pop();
  if (!id) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false,
        error: 'Registration ID is required' 
      })
    };
  }

  try {
    // Attempt to expire the Stripe session
    try {
      const session = await stripe.checkout.sessions.expire(id);
      console.log('Stripe session expired:', session.id);
    } catch (stripeError) {
      console.log('Stripe session expiration note:', stripeError.message);
      // Don't fail if session is already expired/completed
      if (stripeError instanceof Stripe.errors.StripeError && 
          stripeError.code !== 'resource_missing') {
        throw stripeError;
      }
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Registration deleted successfully',
        id: id
      })
    };

  } catch (error) {
    console.error('Error deleting registration:', error);
    
    const statusCode = error instanceof Stripe.errors.StripeError ? 400 : 500;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return {
      statusCode,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Failed to delete registration',
        message: errorMessage,
        code: error instanceof Stripe.errors.StripeError ? error.code : undefined
      })
    };
  }
};
