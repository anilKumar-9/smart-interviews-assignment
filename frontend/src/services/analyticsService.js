import { apiRequest } from './api';

export const analyticsService = {
  // Fetch analytics stats, breakdowns, and completion %
  getAnalytics: async () => {
    const res = await apiRequest('/analytics', { method: 'GET' });
    return res.data;
  },
};
