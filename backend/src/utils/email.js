const nodemailer = require('nodemailer');

// Create transporter with error handling
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    return null;
  }
};

const transporter = createTransporter();

const emailService = {
  async sendEmail(options) {
    if (!transporter) {
      console.error('Email transporter not initialized');
      return false;
    }

    try {
      const result = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        ...options
      });
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  },

  async sendContactConfirmation(contact) {
    return this.sendEmail({
      to: contact.email,
      subject: 'Message Received - Birdieway Golf',
      html: `
        <h1>We've Received Your Message</h1>
        <p>Dear ${contact.name},</p>
        <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
        <p><strong>Your message details:</strong></p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
        <br>
        <p>Best regards,<br>Birdieway Golf Team</p>
      `
    });
  },

  async sendContactNotification(contact) {
    return this.sendEmail({
      to: process.env.EMAIL_FROM,
      subject: 'New Contact Form Submission - Birdieway Golf',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        ${contact.tournamentName ? `<p><strong>Tournament:</strong> ${contact.tournamentName}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `
    });
  },

  async sendRegistrationConfirmation(registration, tournament) {
    return this.sendEmail({
      to: registration.email,
      subject: `Registration Confirmed - ${tournament.name}`,
      html: `
        <h1>Registration Confirmed</h1>
        <p>Dear ${registration.playerName},</p>
        <p>Your registration for ${tournament.name} has been confirmed.</p>
        <p><strong>Tournament Details:</strong></p>
        <ul>
          <li>Date: ${new Date(tournament.date).toLocaleDateString()}</li>
          <li>Location: ${tournament.location}</li>
          <li>League: ${tournament.league}</li>
        </ul>
        <p>Thank you for registering!</p>
        <p>Best regards,<br>Birdieway Golf Team</p>
      `
    });
  }
};

module.exports = emailService;