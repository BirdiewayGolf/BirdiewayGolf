import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      event.headers['stripe-signature']!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      const registrationData = JSON.parse(session.metadata?.registrationData || '{}');

      // Send email to admin and customer
      const emailHtml = `
        <h2>New Registration - ${registrationData.leagueType} League</h2>
        <p>Amount: $${(session.amount_total || 0) / 100}</p>
        <pre>${JSON.stringify(registrationData, null, 2)}</pre>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: `New ${registrationData.leagueType} League Registration`,
        html: emailHtml
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook error' })
    };
  }
};