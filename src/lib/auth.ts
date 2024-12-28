import { create } from 'zustand';

// In a real app, these would be hashed and stored securely
const ADMIN_CREDENTIALS = {
  username: 'birdieway',
  password: 'golfgold'
};

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: (username: string, password: string) => {
    const isValid = 
      username === ADMIN_CREDENTIALS.username && 
      password === ADMIN_CREDENTIALS.password;
    
    if (isValid) {
      set({ isAuthenticated: true });
    }
    return isValid;
  },
  logout: () => set({ isAuthenticated: false })
}));