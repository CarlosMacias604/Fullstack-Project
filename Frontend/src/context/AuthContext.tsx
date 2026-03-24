import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { AuthContextType, User } from '../types/index';
import { authService } from '../services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login({ email, password });

      setToken(response.token);
      setRefreshToken(response.refreshToken);

      // Decode JWT to get user info (basic implementation)
      const payload = JSON.parse(atob(response.token.split('.')[1]));
      const userData: User = {
        _id: payload.userId,
        name: payload.name,
        email,
        role: payload.role,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      setLoading(false);
      throw err;
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role = 'host') => {
    try {
      setLoading(true);
      setError(null);
      await authService.register({ name, email, password, role });
      setLoading(false);
      // After registration, user should log in
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      setLoading(false);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    refreshToken,
    loading,
    error,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
