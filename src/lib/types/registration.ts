export type LeagueType = 'business' | 'junior' | 'longday';

export interface RegistrationBase {
  id: string;
  createdAt: string;
  leagueType: LeagueType;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface BusinessRegistration extends RegistrationBase {
  leagueType: 'business';
  teamName: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface JuniorRegistration extends RegistrationBase {
  leagueType: 'junior';
  playerName: string;
  dateOfBirth: string;
  shirtSize: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

export interface LongDayRegistration extends RegistrationBase {
  leagueType: 'longday';
  teamName: string;
  players: {
    name: string;
    email: string;
    phone: string;
    shirtSize: string;
  }[];
}

export type Registration = BusinessRegistration | JuniorRegistration | LongDayRegistration;