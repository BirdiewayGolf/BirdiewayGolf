import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Stripe from 'stripe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

function mapStripeStatus(stripeStatus) {
  const statusMap = {
    'paid': { status: 'confirmed', paymentStatus: 'paid' },
    'unpaid': { status: 'pending', paymentStatus: 'pending' },
    'expired': { status: 'cancelled', paymentStatus: 'cancelled' },
    'canceled': { status: 'cancelled', paymentStatus: 'cancelled' },
    'complete': { status: 'confirmed', paymentStatus: 'paid' },
    'failed': { status: 'cancelled', paymentStatus: 'failed' }
  };
  return statusMap[stripeStatus] || { status: 'pending', paymentStatus: 'pending' };
}

const app = express();
const port = process.env.PORT || 3000;

// Updated CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'https://birdiewaygolf.onrender.com',
  'https://www.birdiewaygolf.com',
  'https://birdiewaygolf.com'
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'stripe-signature']
}));

// Stripe webhook endpoint - MUST be before express.json() middleware
app.post('/api/verify-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle webhook events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const registrationData = JSON.parse(session.metadata?.registrationData || '{}');
        
        if (session.customer_email) {
          const confirmationEmail = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0A5C36;">Registration Confirmed</h2>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                <p>Payment Successful</p>
                <p><strong>Amount:</strong> $${(session.amount_total || 0) / 100}</p>
                <p><strong>League:</strong> ${session.metadata?.leagueType}</p>
                ${formatRegistrationData(session.metadata?.leagueType, registrationData)}
              </div>
            </div>
          `;

          await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: session.customer_email,
            cc: process.env.EMAIL_ADDRESS,
            subject: 'BirdieWay Golf - Registration Confirmed',
            html: confirmationEmail
          });
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded':
        console.log('Async payment succeeded:', event.data.object.id);
        break;

      case 'checkout.session.async_payment_failed':
        console.log('Async payment failed:', event.data.object.id);
        break;

      case 'checkout.session.expired':
        console.log('Checkout expired:', event.data.object.id);
        break;

      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        break;

      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// Regular request parsing middleware - MUST be after webhook endpoint
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(join(__dirname, '..', 'dist')));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} [${req.method}] ${req.url}`);
  if (req.method === 'POST' || req.method === 'DELETE') {
    console.log('Request body:', req.body);
  }
  next();
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  secure: true,
});

transporter.verify()
  .then(() => {
    console.log('Email configuration verified successfully');
    console.log(`Email configured for: ${process.env.EMAIL_ADDRESS}`);
  })
  .catch((error) => {
    console.error('Email verification failed:', error);
    process.exit(1);
  });

// Email formatting function
const formatRegistrationData = (leagueType, formData) => {
  switch (leagueType) {
    case 'business':
      return `
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 10px 0;">
          <h3 style="margin-bottom: 10px; color: #0A5C36;">Business League Registration Details</h3>
          <p><strong>Team Name:</strong> ${formData.teamName || 'N/A'}</p>
          <p><strong>Company Name:</strong> ${formData.companyName || 'N/A'}</p>
          <p><strong>Contact Name:</strong> ${formData.contactName || 'N/A'}</p>
          <p><strong>Email:</strong> ${formData.email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
        </div>
      `;
    
    case 'junior':
      return `
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 10px 0;">
          <h3 style="margin-bottom: 10px; color: #0A5C36;">Junior League Registration Details</h3>
          <p><strong>Player Name:</strong> ${formData.playerName || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> ${formData.dateOfBirth || 'N/A'}</p>
          <p><strong>Shirt Size:</strong> ${formData.shirtSize || 'N/A'}</p>
          <p><strong>Parent Name:</strong> ${formData.parentName || 'N/A'}</p>
          <p><strong>Parent Email:</strong> ${formData.parentEmail || 'N/A'}</p>
          <p><strong>Parent Phone:</strong> ${formData.parentPhone || 'N/A'}</p>
        </div>
      `;
    
    case 'longday':
      const playersHtml = formData.players 
        ? formData.players.map((player, index) => `
            <div style="background-color: #e9e9e9; padding: 10px; border-radius: 6px; margin: 5px 0;">
              <p><strong>Player ${index + 1} Name:</strong> ${player.name || 'N/A'}</p>
              <p><strong>Email:</strong> ${player.email || 'N/A'}</p>
              <p><strong>Phone:</strong> ${player.phone || 'N/A'}</p>
              <p><strong>Shirt Size:</strong> ${player.shirtSize || 'N/A'}</p>
            </div>
          `).join('')
        : '<p>No players registered</p>';

      return `
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 10px 0;">
          <h3 style="margin-bottom: 10px; color: #0A5C36;">Long Day League Registration Details</h3>
          <p><strong>Team Name:</strong> ${formData.teamName || 'N/A'}</p>
          <h4 style="margin-top: 15px;">Players:</h4>
          ${playersHtml}
        </div>
      `;
    
    default:
      return `
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 10px 0;">
          <p>Unrecognized League Type</p>
        </div>
      `;
  }
};

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number format'
      });
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
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ['data.customer']
    });

    const registrations = sessions.data
      .filter(session => {
        if (session.metadata?.status === 'cancelled') return false;
        if (session.status === 'expired' || session.status === 'canceled') return false;
        return true;
      })
      .map(session => {
        const { status, paymentStatus } = mapStripeStatus(session.payment_status);
        return {
          id: session.id,
          customerEmail: session.customer_email,
          amount: session.amount_total,
          status,
          paymentStatus,
          leagueType: session.metadata?.leagueType,
          registrationData: session.metadata?.registrationData
            ? JSON.parse(session.metadata.registrationData)
            : {},
          createdAt: session.created
        };
      });

    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

app.delete('/api/registrations/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    console.log('Attempting to delete session:', sessionId);
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    try {
      await stripe.checkout.sessions.update(sessionId, {
        metadata: {
          ...session.metadata,
          status: 'cancelled',
          cancelledAt: new Date().toISOString()
        }
      });
      console.log('Session marked as cancelled:', sessionId);
    } catch (updateError) {
      console.error('Error updating session:', updateError);
    }
    
    if (session.payment_status === 'paid') {
      const registrationData = JSON.parse(session.metadata?.registrationData || '{}');
      
      const cancellationEmail = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A5C36;">Registration Cancelled</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p>The following registration has been cancelled:</p>
            <p><strong>League:</strong> ${session.metadata?.leagueType}</p>
            <p><strong>Amount:</strong> $${(session.amount_total || 0) / 100}</p>
            ${formatRegistrationData(session.metadata?.leagueType, registrationData)}
          </div>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_ADDRESS,
          to: session.customer_email,
          cc: process.env.EMAIL_ADDRESS,
          subject: 'BirdieWay Golf - Registration Cancelled',
          html: cancellationEmail
        });
      } catch (emailError) {
        console.error('Failed to send cancellation email:', emailError);
      }
    }

    res.json({ 
      success: true,
      message: 'Registration cancelled successfully',
      sessionId,
      status: 'cancelled',
      paymentStatus: 'cancelled'
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    if (error.code === 'resource_missing') {
      return res.status(404).json({
        success: false,
        error: 'Registration not found'
      });
    }
    res.status(500).json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete registration'
    });
  }
});

app.post('/api/create-checkout', async (req, res) => {
  try {
    const { leagueType, price, formData } = req.body;

    if (!leagueType || !price) {
      return res.status(400).json({
        error: 'Missing required fields: leagueType and price are required'
      });
    }

    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://birdiewaygolf.onrender.com'
      : 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${leagueType.charAt(0).toUpperCase() + leagueType.slice(1)} League Registration`,
              description: `Registration for ${leagueType} league`
            },
            unit_amount: price
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${baseUrl}/registration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/registration/cancel`,
      metadata: {
        leagueType,
        registrationData: JSON.stringify(formData)
      },
      customer_email: formData.email || formData.parentEmail || formData.players?.[0]?.email
    });

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A5C36;">New ${leagueType} League Registration</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h3>Registration Details</h3>
          <p><strong>League Type:</strong> ${leagueType}</p>
          <p><strong>Amount:</strong> $${price/100}</p>
          ${formatRegistrationData(leagueType, formData)}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      subject: `New ${leagueType} League Registration`,
      html: emailContent
    });

    res.json({
      id: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create checkout session'
    });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  try {
    console.log('Verify Payment Request Body:', req.body);
    const sessionId = req.body.sessionId || req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ 
        success: false,
        error: 'Session ID is required' 
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const registrationData = JSON.parse(session.metadata?.registrationData || '{}');
      
      const confirmationEmail = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A5C36;">Registration Confirmed</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p>Payment Successful</p>
            <p><strong>Amount:</strong> $${(session.amount_total || 0) / 100}</p>
            <p><strong>League:</strong> ${session.metadata?.leagueType}</p>
            ${formatRegistrationData(session.metadata?.leagueType, registrationData)}
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: session.customer_email,
        cc: process.env.EMAIL_ADDRESS,
        subject: 'BirdieWay Golf - Registration Confirmed',
        html: confirmationEmail
      });
    }

    const { status, paymentStatus } = mapStripeStatus(session.payment_status);
    res.json({
      success: true,
      status,
      paymentStatus,
      amount: session.amount_total,
      league: session.metadata?.leagueType,
      email: session.customer_email
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to verify payment' 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Handle SPA routing - must be last
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});