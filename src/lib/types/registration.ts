export type LeagueType = 'business' | 'junior' | 'longday';
export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export interface RegistrationResponse {
  success: boolean;
  data: {
    payment: {
      amount: number;
      currency: string;
      status: string;
      date: string;
    };
    registration: {
      type: LeagueType;
      email: string;
      id: string;
      details: RegistrationData;
    };
  };
}

export interface RegistrationBase {
  id: string;
  createdAt: string | number;
  leagueType: LeagueType;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  stripeSessionId?: string;
  amount: number;
  customerEmail?: string;
  registrationData?: {
    playerName?: string;
    teamName?: string;
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    shirtSize?: string;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;
    players?: Array<{
      name: string;
      email: string;
      phone: string;
      shirtSize: string;
    }>;
    [key: string]: any;
  };
}

export interface BusinessRegistrationData extends RegistrationBase {
  leagueType: 'business';
  teamName: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface JuniorRegistrationData extends RegistrationBase {
  leagueType: 'junior';
  playerName: string;
  dateOfBirth: string;
  shirtSize: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

export interface LongDayRegistrationData extends RegistrationBase {
  leagueType: 'longday';
  teamName: string;
  players: Array<{
    name: string;
    email: string;
    phone: string;
    shirtSize: string;
  }>;
}

export type RegistrationData = 
  BusinessRegistrationData | 
  JuniorRegistrationData | 
  LongDayRegistrationData;

export interface StripeSessionData {
  id: string;
  customerEmail: string;
  amount: number;
  status: string;
  leagueType: LeagueType;
  registrationData: string | Record<string, any>;
  created: number;
}

export interface RegistrationState {
  registrations: RegistrationData[];
  isLoading: boolean;
  error: string | null;
  fetchRegistrations: () => Promise<void>;
  addRegistration: (registration: Omit<RegistrationData, 'id' | 'createdAt'>) => void;
  updateRegistration: (id: string, updates: Partial<RegistrationData>) => void;
  deleteRegistration: (id: string) => Promise<void>;
  getRegistrationsByLeague: (leagueType: LeagueType) => RegistrationData[];
}