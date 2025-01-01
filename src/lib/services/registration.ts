import { sendEmail } from './email';
import {
  RegistrationData,
  BusinessRegistrationData,
  LongDayRegistrationData,
  JuniorRegistrationData
} from '../types/registration';

interface Player {
  name: string;
  email: string;
  phone: string;
  shirtSize: string;
}

interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function processRegistration(data: RegistrationData) {
  try {
    const emailData: EmailData = {
      name: getRegistrationName(data),
      email: getRegistrationEmail(data),
      phone: getRegistrationPhone(data),
      message: generateEmailTemplate(data)
    };

    await sendEmail(emailData);
    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

function getRegistrationName(data: RegistrationData): string {
  switch (data.leagueType) {
    case 'business':
      return (data as BusinessRegistrationData).contactName;
    case 'junior':
      return (data as JuniorRegistrationData).playerName;
    case 'longday':
      return (data as LongDayRegistrationData).teamName;
    default:
      return 'Unknown Registrant';
  }
}

function getRegistrationEmail(data: RegistrationData): string {
  switch (data.leagueType) {
    case 'business':
      return (data as BusinessRegistrationData).email;
    case 'junior':
      return (data as JuniorRegistrationData).parentEmail;
    case 'longday':
      return (data as LongDayRegistrationData).players[0]?.email || '';
    default:
      return '';
  }
}

function getRegistrationPhone(data: RegistrationData): string {
  switch (data.leagueType) {
    case 'business':
      return (data as BusinessRegistrationData).phone;
    case 'junior':
      return (data as JuniorRegistrationData).parentPhone;
    case 'longday':
      return (data as LongDayRegistrationData).players[0]?.phone || '';
    default:
      return '';
  }
}

function generateEmailTemplate(data: RegistrationData): string {
  const baseTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0A5C36;">New League Registration</h2>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h3 style="color: #0A5C36;">Registration Details</h3>
        <p><strong>League Type:</strong> ${data.leagueType}</p>
        <p><strong>Registration Status:</strong> ${data.status}</p>
        <p><strong>Payment Status:</strong> ${data.paymentStatus}</p>
  `;

  let specificContent = '';

  switch (data.leagueType) {
    case 'business': {
      const businessData = data as BusinessRegistrationData;
      specificContent = `
        <h3 style="color: #0A5C36;">Business League Information</h3>
        <p><strong>Team Name:</strong> ${businessData.teamName}</p>
        <p><strong>Company Name:</strong> ${businessData.companyName}</p>
        <p><strong>Contact Information</strong></p>
        <p><strong>Contact Name:</strong> ${businessData.contactName}</p>
        <p><strong>Email:</strong> ${businessData.email}</p>
        <p><strong>Phone:</strong> ${businessData.phone}</p>
      `;
      break;
    }
    case 'junior': {
      const juniorData = data as JuniorRegistrationData;
      specificContent = `
        <h3 style="color: #0A5C36;">Junior League Information</h3>
        <p><strong>Player Information</strong></p>
        <p><strong>Player Name:</strong> ${juniorData.playerName}</p>
        <p><strong>Date of Birth:</strong> ${juniorData.dateOfBirth}</p>
        <p><strong>Shirt Size:</strong> ${juniorData.shirtSize}</p>
        <h3 style="color: #0A5C36;">Parent/Guardian Information</h3>
        <p><strong>Parent Name:</strong> ${juniorData.parentName}</p>
        <p><strong>Parent Email:</strong> ${juniorData.parentEmail}</p>
        <p><strong>Parent Phone:</strong> ${juniorData.parentPhone}</p>
      `;
      break;
    }
    case 'longday': {
      const longdayData = data as LongDayRegistrationData;
      specificContent = `
        <h3 style="color: #0A5C36;">Long Day League Information</h3>
        <p><strong>Team Name:</strong> ${longdayData.teamName}</p>
        ${generatePlayersList(longdayData.players)}
      `;
      break;
    }
  }

  return `
    ${baseTemplate}
    ${specificContent}
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
      <p style="color: #666; font-size: 12px;">Registration ID: ${data.id}</p>
      <p style="color: #666; font-size: 12px;">Registration Date: ${new Date(data.createdAt).toLocaleString()}</p>
    </div>
    </div>
    </div>
  `;
}

function generatePlayersList(players: Player[]): string {
  return `
    <div class="players-list">
      <h3 style="color: #0A5C36;">Team Members</h3>
      <div style="margin-left: 20px;">
        ${players.map((player, index) => `
          <div style="margin-bottom: 20px; padding: 15px; background-color: #ffffff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h4 style="margin: 0 0 10px 0; color: #0A5C36;">Player ${index + 1}</h4>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${player.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${player.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${player.phone}</p>
            <p style="margin: 5px 0;"><strong>Shirt Size:</strong> ${player.shirtSize}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}