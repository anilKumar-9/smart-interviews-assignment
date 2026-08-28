// Central API Client with JWT Header Interceptor
// In production (Vercel), uses VITE_API_URL or defaults to deployed Render backend API
// In development, defaults to '/api' (proxied to localhost:5000 by Vite)
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    const url = import.meta.env.VITE_API_URL.trim();
    return url.endsWith('/') ? url.slice(0, -1) : url;
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
