export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://birdiewaygolf.onrender.com'
    : 'http://localhost:3000',
  endpoints: {
    contact: '/api/contact',
    email: '/api/send-email',
    // Add other endpoints as needed
  }
} as const;