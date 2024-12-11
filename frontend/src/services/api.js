import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5004';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers
      });
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
        toast.error('Session expired. Please log in again.');
      }
    }

    const errorMessage = error.response.data?.message || 
      error.response.data?.error || 
      'An error occurred';

    if (error.response.status !== 401) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials) => api.post('/api/auth/login', credentials),
    verifyToken: () => api.get('/api/auth/verify'),
    logout: () => api.post('/api/auth/logout')
  },

  // Tournament endpoints
  tournaments: {
    getAll: () => api.get('/api/admin/tournaments'),
    getOne: (id) => api.get(`/api/admin/tournaments/${id}`),
    create: (data) => api.post('/api/admin/tournaments', data),
    update: (id, data) => api.put(`/api/admin/tournaments/${id}`, data),
    delete: (id) => api.delete(`/api/admin/tournaments/${id}`),
    getPublic: (league) => api.get(`/api/public/tournaments/${league}`),
    getDetails: (id) => api.get(`/api/public/tournaments/details/${id}`)
  },

  // Standings endpoints
  standings: {
    getLeagueStandings: (league, season) => api.get(`/api/standings/league/${league}/${season}`),
    getAdminStandings: (league, season) => api.get(`/api/standings/admin/standings/${league}/${season}`),
    updateStandings: (league, season, data) => api.put(`/api/standings/admin/standings/${league}/${season}`, data)
  },

  // Registration endpoints
  registrations: {
    create: (data) => api.post('/api/registrations', data),
    submitBusinessRegistration: (tournamentId, formData) => api.post(
      `/api/registrations/business/${tournamentId}`,
      formData
    ),
    submitJuniorRegistration: (tournamentId, formData) => api.post(
      `/api/registrations/junior/${tournamentId}`,
      formData
    ),
    getAll: () => api.get('/api/admin/registrations'),
    getByTournament: (tournamentId) => api.get(`/api/admin/registrations/tournament/${tournamentId}`),
    updateStatus: (id, status) => api.patch(`/api/admin/registrations/${id}/status`, { status }),
    updatePaymentStatus: (id, paymentStatus) => api.patch(
      `/api/admin/registrations/${id}/payment`,
      { paymentStatus }
    ),
    delete: (id) => api.delete(`/api/admin/registrations/${id}`)
  },

  // Contact endpoints
  contact: {
    submit: (data) => api.post('/api/contact', data),
    getAll: () => api.get('/api/admin/contact'),
    updateStatus: (id, status) => api.patch(`/api/admin/contact/${id}/status`, { status }),
    delete: (id) => api.delete(`/api/admin/contact/${id}`)
  }
};

export default api;