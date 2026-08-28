// Central API Client with JWT Header Interceptor
// In production (Vercel), automatically ensures /api prefix
// In development, defaults to '/api' (proxied to localhost:5000 by Vite)
const getBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.trim() : '';
  if (url) {
    if (url.endsWith('/')) url = url.slice(0, -1);
    if (!url.endsWith('/api')) url = `${url}/api`;
    return url;
  }
  if (import.meta.env.PROD) {
    return 'https://smart-interviews-assignment.onrender.com/api';
  }
  return '/api';
};

const BASE_URL = getBaseUrl();

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        // If unauthorized and not on login/signup endpoint, dispatch auth expired event
        if (!endpoint.includes('/auth/login') && !endpoint.includes('/auth/signup') && !endpoint.includes('/auth/demo')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('auth-logout'));
        }
      }

      const errorMessage = data.message || (data.errors && data.errors.join(', ')) || `HTTP Error ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.status) throw error;
    throw new Error(error.message || 'Network error. Please check backend connection.');
  }
};
