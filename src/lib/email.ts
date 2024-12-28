import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false
  }
});

interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendEmail(data: EmailData) {
  const { name, email, phone, message } = data;

  try {
    await transporter.verify();

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}