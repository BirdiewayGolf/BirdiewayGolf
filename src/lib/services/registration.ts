import { sendEmail } from './email';
import type { RegistrationData } from '../types/registration';

export async function processRegistration(data: RegistrationData) {
  try {
    // Send email notification
    await sendEmail({
      to: process.env.EMAIL_ADDRESS || '',
      subject: `New Registration: ${data.leagueType} League`,
      html: generateEmailTemplate(data),
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

function generateEmailTemplate(data: RegistrationData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0A5C36;">New League Registration</h2>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h3 style="color: #0A5C36;">Registration Details</h3>
        <p><strong>League Type:</strong> ${data.leagueType}</p>
        <p><strong>Team Name:</strong> ${data.teamName}</p>
        ${data.companyName ? `<p><strong>Company:</strong> ${data.companyName}</p>` : ''}
        
        <h3 style="color: #0A5C36;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.contactName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        
        ${data.players ? generatePlayersList(data.players) : ''}
      </div>
    </div>
  `;
}

function generatePlayersList(players: any[]): string {
  return `
    <h3 style="color: #0A5C36;">Team Members</h3>
    <div style="margin-left: 20px;">
      ${players.map((player, index) => `
        <div style="margin-bottom: 15px;">
          <h4 style="margin: 0;">Player ${index + 1}</h4>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${player.name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${player.email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${player.phone}</p>
          <p style="margin: 5px 0;"><strong>Shirt Size:</strong> ${player.shirtSize}</p>
        </div>
      `).join('')}
    </div>
  `;
}