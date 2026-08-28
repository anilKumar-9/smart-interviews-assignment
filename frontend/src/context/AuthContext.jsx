import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state on initial mount
  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const profile = await authService.getMe();
          setUser((prev) => ({ ...prev, ...profile }));
          localStorage.setItem('user', JSON.stringify({ ...user, ...profile }));
        } catch (err) {
          console.warn('Session expired or invalid token:', err.message);
          logout();
        }
      }
      setIsLoading(false);
    };

    verifyUser();

    // Listen to global 401 logout events from api.js
    const handleAuthLogout = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener('auth-logout', handleAuthLogout);
    return () => window.removeEventListener('auth-logout', handleAuthLogout);
  }, [token]);

  const handleAuthSuccess = (data) => {
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
    };
    setUser(userData);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    handleAuthSuccess(data);
    return data;
  };

  const signup = async (name, email, password) => {
    const data = await authService.signup({ name, email, password });
    handleAuthSuccess(data);
    return data;
  };

  const demoLogin = async () => {
    const data = await authService.demoLogin();
    handleAuthSuccess(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        signup,
        demoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
