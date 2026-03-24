import api from './api';
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/index';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    const { token, refreshToken } = response.data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<{ message: string }> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh-token', { token: refreshToken });
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return response.data;
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
};
