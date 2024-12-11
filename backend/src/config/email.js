const nodemailer = require('nodemailer');

const emailConfig = {
  transporter: nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  }),

  defaultFrom: process.env.EMAIL_FROM,

  templates: {
    registration: {
      subject: 'Registration Confirmation - Birdieway Golf',
      generateHtml: (data) => `
        <h1>Registration Confirmed</h1>
        <p>Dear ${data.playerName},</p>
        <p>Your registration for ${data.tournamentName} has been confirmed.</p>
        <p><strong>Tournament Details:</strong></p>
        <ul>
          <li>Date: ${data.date}</li>
          <li>Location: ${data.location}</li>
          <li>League: ${data.league}</li>
        </ul>
        <p>Thank you for registering!</p>
        <p>Best regards,<br>Birdieway Golf Team</p>
      `
    },
    contact: {
      subject: 'Message Received - Birdieway Golf',
      generateHtml: (data) => `
        <h1>We've Received Your Message</h1>
        <p>Dear ${data.name},</p>
        <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
        <p>Best regards,<br>Birdieway Golf Team</p>
      `
    }
  }
};

module.exports = emailConfig;