import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Registration } from '../types/registration';

interface RegistrationState {
  registrations: Registration[];
  addRegistration: (registration: Omit<Registration, 'id' | 'createdAt'>) => void;
  updateRegistration: (id: string, updates: Partial<Registration>) => void;
  deleteRegistration: (id: string) => void;
  getRegistrationsByLeague: (leagueType: Registration['leagueType']) => Registration[];
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set, get) => ({
      registrations: [],
      addRegistration: (registration) => {
        const newRegistration = {
          ...registration,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          registrations: [...state.registrations, newRegistration],
        }));
      },
      updateRegistration: (id, updates) => {
        set((state) => ({
          registrations: state.registrations.map((reg) =>
            reg.id === id ? { ...reg, ...updates } : reg
          ),
        }));
      },
      deleteRegistration: (id) => {
        set((state) => ({
          registrations: state.registrations.filter((reg) => reg.id !== id),
        }));
      },
      getRegistrationsByLeague: (leagueType) => {
        return get().registrations.filter((reg) => reg.leagueType === leagueType);
      },
    }),
    {
      name: 'registration-storage',
    }
  )
);