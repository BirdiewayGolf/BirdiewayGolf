const API_BASE = '/.netlify/functions';

export const API_ENDPOINTS = {
  email: `${API_BASE}/send-email`
} as const;