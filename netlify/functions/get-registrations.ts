import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { 
  RegistrationStatus, 
  PaymentStatus, 
  LeagueType, 
  RegistrationData 
} from '../../src/lib/types/registration';

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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: [
        'data.payment_intent',
        'data.line_items',
        'data.customer'
      ]
    });

    const registrations = sessions.data.map(session => {
      const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
      const stripeStatus = paymentIntent?.status || session.status;
      
      let paymentStatus: PaymentStatus;
      let status: RegistrationStatus;

      switch (stripeStatus) {
        case 'succeeded':
          paymentStatus = 'paid';
          status = 'confirmed';
          break;
        case 'requires_payment_method':
        case 'requires_confirmation':
        case 'requires_action':
        case 'processing':
          paymentStatus = 'pending';
          status = 'pending';
          break;
        case 'canceled':
          paymentStatus = 'cancelled';
          status = 'cancelled';
          break;
        default:
          paymentStatus = 'pending';
          status = 'pending';
      }

      let registrationData = {};
      try {
        registrationData = session.metadata?.registrationData 
          ? JSON.parse(session.metadata.registrationData)
          : {};
      } catch (e) {
        console.error('Error parsing registration data:', e);
      }

      return {
        id: session.id,
        customerEmail: session.customer_email,
        amount: session.amount_total,
        status,
        paymentStatus,
        leagueType: session.metadata?.leagueType as LeagueType,
        registrationData,
        createdAt: session.created
      } as RegistrationData;
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(registrations)
    };

  } catch (error) {
    console.error('Error fetching registrations:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch registrations',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
