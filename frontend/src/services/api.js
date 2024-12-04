// src/services/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5004/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log outgoing requests for debugging
    console.log('Making request to:', config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log('Received response:', response.data);
    return response;
  },
  (error) => {
    if (!error.response) {
      // Network error
      toast.error('Network error - Please check if the server is running');
      console.error('Network error:', error);
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
      toast.error('Session expired. Please log in again.');
    } else {
      const errorMessage = error.response.data?.message ||
        error.response.data?.error ||
        'An error occurred';

      // If there are validation errors, show them in detail
      if (error.response.data?.errors) {
        const validationErrors = Object.entries(error.response.data.errors)
          .map(([field, message]) => `${field}: ${message}`)
          .join(', ');
        toast.error(`Validation errors: ${validationErrors}`);
      } else {
        toast.error(errorMessage);
      }

      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    }
    return Promise.reject(error);
  }
);

// Contact Form Service
export const sendContactMessage = async (formData) => {
  try {
    console.log('Sending contact message:', formData);
    const response = await axiosInstance.post('/contact', formData);
    toast.success('Message sent successfully!');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to send message.';
    toast.error(message);
    console.error('Error in sendContactMessage:', error.response || error.message);
    throw error;
  }
};

// Tournament Services
export const tournamentService = {
  create: async (data) => {
    try {
      console.log('Creating tournament:', data);
      const response = await axiosInstance.post('/admin/tournaments', data);
      console.log('Tournament created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating tournament:', error.response?.data || error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      console.log('Fetching all tournaments');
      const response = await axiosInstance.get('/admin/tournaments');
      console.log('Tournaments fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching tournaments:', error.response?.data || error);
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      console.log('Fetching tournament:', id);
      const response = await axiosInstance.get(`/admin/tournaments/${id}`);
      console.log('Tournament fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching tournament:', error.response?.data || error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      console.log('Updating tournament:', { id, data });
      const response = await axiosInstance.put(`/admin/tournaments/${id}`, data);
      console.log('Tournament updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating tournament:', {
        error: error.response?.data || error,
        status: error.response?.status,
        url: error.config?.url,
        data: error.config?.data
      });
      throw error;
    }
  },

  delete: async (id) => {
    try {
      console.log('Deleting tournament:', id);
      const response = await axiosInstance.delete(`/admin/tournaments/${id}`);
      console.log('Tournament deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting tournament:', error.response?.data || error);
      throw error;
    }
  }
};

export default axiosInstance;