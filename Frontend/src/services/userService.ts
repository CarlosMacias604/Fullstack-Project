import api from './api';
import type { User, PaginatedResponse } from '../types/index';

interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
}

export const userService = {
  getUsers: async (page = 1, limit = 10): Promise<PaginatedResponse<User>> => {
    const response = await api.get('/users', {
      params: { page, limit },
    });
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: UpdateUserData): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
