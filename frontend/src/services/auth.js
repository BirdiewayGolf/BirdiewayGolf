import api from './api';
import { toast } from 'react-toastify';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);  // Added /api prefix
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response.data.data;
      }
      return null;
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error('Too many attempts. Please wait a moment and try again.');
      } else {
        toast.error(error.response?.data?.message || 'Login failed. Please try again.');
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  verifyToken: async () => {
    try {
      const response = await api.get('/api/auth/verify');  // Added /api prefix
      return response.data.success;
    } catch (error) {
      if (error.response?.status === 429) {
        // Don't throw on rate limit
        return true;
      }
      throw error;
    }
  }
};

export default authService;