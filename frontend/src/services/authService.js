import { apiRequest } from './api';

export const authService = {
  // Register a new user
  signup: async (userData) => {
    const res = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return res.data;
  },

  // Authenticate user
  login: async (credentials) => {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return res.data;
  },

  // 1-Click Demo Login
  demoLogin: async () => {
    const res = await apiRequest('/auth/demo', {
      method: 'POST',
    });
    return res.data;
  },

  // Get current user profile
  getMe: async () => {
    const res = await apiRequest('/auth/me', {
      method: 'GET',
    });
    return res.data;
  },
};
