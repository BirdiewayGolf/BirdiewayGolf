import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  secure: true
});

const generateEmailContent = (session: Stripe.Checkout.Session) => {
  const registrationData = JSON.parse(session.metadata?.registrationData || '{}');
  const leagueType = session.metadata?.leagueType;

  let registrationDetails = '';
  switch(leagueType) {
    case 'junior':
      registrationDetails = `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #0A5C36; border-bottom: 1px solid #0A5C36; padding-bottom: 8px;">Player Information</h3>
          <div style="padding: 10px; background-color: #ffffff; border-radius: 4px;">
            <p style="margin: 8px 0;"><strong>Player Name:</strong> ${registrationData.playerName}</p>
            <p style="margin: 8px 0;"><strong>Date of Birth:</strong> ${registrationData.dateOfBirth}</p>
            <p style="margin: 8px 0;"><strong>Shirt Size:</strong> ${registrationData.shirtSize}</p>
          </div>
          
          <h3 style="color: #0A5C36; border-bottom: 1px solid #0A5C36; padding-bottom: 8px; margin-top: 20px;">Parent Information</h3>
          <div style="padding: 10px; background-color: #ffffff; border-radius: 4px;">
            <p style="margin: 8px 0;"><strong>Parent Name:</strong> ${registrationData.parentName}</p>
            <p style="margin: 8px 0;"><strong>Parent Email:</strong> ${registrationData.parentEmail}</p>
            <p style="margin: 8px 0;"><strong>Parent Phone:</strong> ${registrationData.parentPhone}</p>
          </div>
        </div>
      `;
      break;
    case 'business':
      registrationDetails = `
        <div style="padding: 10px; background-color: #ffffff; border-radius: 4px;">
          <p style="margin: 8px 0;"><strong>Team Name:</strong> ${registrationData.teamName}</p>
          <p style="margin: 8px 0;"><strong>Company Name:</strong> ${registrationData.companyName}</p>
          <p style="margin: 8px 0;"><strong>Contact Name:</strong> ${registrationData.contactName}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${registrationData.email}</p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${registrationData.phone}</p>
        </div>
      `;
      break;
    case 'longday':
      registrationDetails = Object.keys(registrationData)
        .filter(key => key.startsWith('player'))
        .map(key => `
          <div style="margin-bottom: 15px; padding: 10px; background-color: #ffffff; border-radius: 4px;">
            <h3 style="color: #0A5C36; margin: 0 0 10px 0; border-bottom: 1px solid #0A5C36; padding-bottom: 5px;">
              ${key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${registrationData[key].name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${registrationData[key].email}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${registrationData[key].phone}</p>
            <p style="margin: 8px 0;"><strong>Shirt Size:</strong> ${registrationData[key].shirtSize}</p>
          </div>
        `).join('');
      break;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0A5C36; margin-bottom: 20px;">Registration Confirmed</h2>
      
      <div style="background-color: #f0f7f4; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #0A5C36; margin-top: 0;">Payment Details</h3>
        <div style="background-color: #ffffff; padding: 10px; border-radius: 4px;">
          <p style="margin: 8px 0;"><strong>Status:</strong> Payment Successful</p>
          <p style="margin: 8px 0;"><strong>Amount:</strong> $${(session.amount_total || 0) / 100}</p>
          <p style="margin: 8px 0;"><strong>League Type:</strong> ${leagueType}</p>
        </div>
      </div>

      <div style="background-color: #f0f7f4; padding: 15px; border-radius: 8px;">
        <h3 style="color: #0A5C36; margin-top: 0;">Registration Details</h3>
        ${registrationDetails}
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #0A5C36; font-size: 12px; color: #666;">
          <p style="margin: 5px 0;">Registration ID: ${session.id}</p>
          <p style="margin: 5px 0;">Date: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  `;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { sessionId } = JSON.parse(event.body || '');
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.customer_email) {
      const emailContent = generateEmailContent(session);
      await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: session.customer_email,
        cc: process.env.EMAIL_ADDRESS,
        subject: `BirdieWay Golf - Registration Confirmation`,
        html: emailContent
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        status: session.payment_status,
        amount: session.amount_total,
        league: session.metadata?.leagueType,
        email: session.customer_email
      }),
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to verify payment' 
      }),
    };
  }
};
