const nodemailer = require('nodemailer');

// Configure Nodemailer transporter with updated settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'birdiewaygolf@gmail.com',
    pass: 'zcrbbuzzvzylivgx'  // New app password with spaces removed
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2"
  }
});

// Test the SMTP configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages.');
  }
});

// Send registration confirmation email
exports.sendRegistrationEmail = async (registration) => {
  try {
    await transporter.sendMail({
      from: {
        name: 'Birdie Loop Golf',
        address: 'birdiewaygolf@gmail.com'
      },
      to: registration.email,
      subject: 'Tournament Registration Confirmation',
      html: `
        <h1>Registration Confirmed</h1>
        <p>Thank you for registering for our tournament.</p>
        <p>Details will be sent shortly.</p>
      `
    });
    console.log('Registration email sent to:', registration.email);
    return { success: true };
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error;
  }
};

// Send tournament update email
exports.sendTournamentUpdateEmail = async (tournament, registrations) => {
  try {
    const recipientEmails = registrations.map((reg) => reg.email).join(', ');
    await transporter.sendMail({
      from: {
        name: 'Birdie Loop Golf',
        address: 'birdiewaygolf@gmail.com'
      },
      to: recipientEmails,
      subject: `Update: ${tournament.name}`,
      html: `
        <h1>Tournament Update</h1>
        <p>There have been updates to the ${tournament.name} tournament.</p>
        <p>Please check your dashboard for details.</p>
      `
    });
    console.log('Tournament update email sent to:', recipientEmails);
    return { success: true };
  } catch (error) {
    console.error('Error sending tournament update email:', error);
    throw error;
  }
};

// Send contact form email
exports.sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    const mailOptions = {
      from: {
        name: 'Birdie Loop Golf',
        address: 'birdiewaygolf@gmail.com'
      },
      to: 'birdiewaygolf@gmail.com',
      replyTo: email,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

module.exports = {
  sendRegistrationEmail: exports.sendRegistrationEmail,
  sendTournamentUpdateEmail: exports.sendTournamentUpdateEmail,
  sendContactEmail: exports.sendContactEmail
};