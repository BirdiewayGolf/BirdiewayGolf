import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  RegistrationData, 
  RegistrationState,
  LeagueType,
  BusinessRegistrationData,
  JuniorRegistrationData,
  LongDayRegistrationData,
  RegistrationStatus,
  PaymentStatus
} from '../types/registration';

type UpdateRegistrationData = Partial<RegistrationData>;

const API_URL = '/api/registrations';

function mapStatus(serverStatus: string): { status: RegistrationStatus; paymentStatus: PaymentStatus } {
  switch (serverStatus) {
    case 'paid':
    case 'complete':
      return { status: 'confirmed', paymentStatus: 'paid' };
    case 'cancelled':
    case 'expired':
      return { status: 'cancelled', paymentStatus: 'cancelled' };
    case 'failed':
      return { status: 'cancelled', paymentStatus: 'failed' };
    default:
      return { status: 'pending', paymentStatus: 'pending' };
  }
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set, get) => ({
      registrations: [],
      isLoading: false,
      error: null,

      fetchRegistrations: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(API_URL, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch registrations: ${response.statusText}`);
          }
          
          const text = await response.text();
          let data: any[];
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error('Invalid JSON:', text);
            throw new Error('Invalid response format from server');
          }
          
          const transformedData: RegistrationData[] = data.map(reg => {
            const registrationData = reg.registrationData || {};
            const { status, paymentStatus } = mapStatus(reg.status);

            const base = {
              id: reg.id,
              createdAt: reg.createdAt,
              status,
              paymentStatus,
              stripeSessionId: reg.id,
              amount: reg.amount,
              leagueType: reg.leagueType as LeagueType,
              customerEmail: reg.customerEmail,
              registrationData
            };

            switch (reg.leagueType) {
              case 'business':
                return {
                  ...base,
                  leagueType: 'business',
                  teamName: registrationData.teamName || '',
                  companyName: registrationData.companyName || '',
                  contactName: registrationData.contactName || '',
                  email: registrationData.email || reg.customerEmail || '',
                  phone: registrationData.phone || ''
                } as BusinessRegistrationData;

              case 'junior':
                return {
                  ...base,
                  leagueType: 'junior',
                  playerName: registrationData.playerName || '',
                  dateOfBirth: registrationData.dateOfBirth || '',
                  shirtSize: registrationData.shirtSize || '',
                  parentName: registrationData.parentName || '',
                  parentEmail: registrationData.parentEmail || reg.customerEmail || '',
                  parentPhone: registrationData.parentPhone || ''
                } as JuniorRegistrationData;

              case 'longday':
                return {
                  ...base,
                  leagueType: 'longday',
                  teamName: registrationData.teamName || '',
                  players: [
                    registrationData.player1,
                    registrationData.player2,
                    registrationData.player3,
                    registrationData.player4
                  ].filter(Boolean)
                } as LongDayRegistrationData;

              default:
                throw new Error(`Unknown league type: ${reg.leagueType}`);
            }
          });

          set({ registrations: transformedData, error: null, isLoading: false });
        } catch (error) {
          console.error('Fetch error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch registrations',
            isLoading: false 
          });
          throw error;
        }
      },

      addRegistration: (registration: Omit<RegistrationData, 'id' | 'createdAt'>) => {
        const newRegistration: RegistrationData = {
          ...registration,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          status: 'pending',
          paymentStatus: 'pending'
        } as RegistrationData;

        set((state) => ({
          ...state,
          registrations: [...state.registrations, newRegistration]
        }));
      },

      updateRegistration: (id: string, updates: UpdateRegistrationData) => {
        set((state) => ({
          ...state,
          registrations: state.registrations.map((reg) =>
            reg.id === id ? { ...reg, ...updates } as RegistrationData : reg
          )
        }));
      },

      deleteRegistration: async (id: string): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to delete registration: ${response.statusText}`);
          }

          const result = await response.json();

          if (result.success) {
            set((state) => ({
              registrations: state.registrations.filter((reg) => reg.id !== id),
              error: null,
              isLoading: false
            }));
            
            await get().fetchRegistrations();
          } else {
            throw new Error(result.error || 'Failed to delete registration');
          }
        } catch (error) {
          console.error('Delete error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete registration',
            isLoading: false 
          });
          throw error;
        }
      },

      getRegistrationsByLeague: (leagueType: LeagueType) => {
        return get().registrations.filter((reg) => reg.leagueType === leagueType);
      }
    }),
    {
      name: 'registration-storage',
    }
  )
);
