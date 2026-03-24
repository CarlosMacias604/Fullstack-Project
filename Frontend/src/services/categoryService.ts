import api from './api';
import type { Category } from '../types/index';

interface CreateCategoryData {
  name: string;
}

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategory: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (data: CreateCategoryData): Promise<{ message: string; category: Category }> => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  updateCategory: async (id: string, data: CreateCategoryData): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
