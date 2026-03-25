import api from './api';
import type { Comment, PaginatedResponse } from '../types/index';

interface CreateCommentData {
  content: string;
}

export const commentService = {
  getComments: async (postId: string, page = 1, limit = 10): Promise<PaginatedResponse<Comment>> => {
    const response = await api.get(`/posts/${postId}/comments`, {
      params: { page, limit },
    });
    return response.data;
  },

  getComment: async (id: string): Promise<Comment> => {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  },

  createComment: async (postId: string, data: CreateCommentData): Promise<{ message: string; comment: Comment }> => {
    const response = await api.post(`/posts/${postId}/comments`, data);
    return response.data;
  },

  updateComment: async (id: string, data: CreateCommentData): Promise<{ message: string; comment: Comment }> => {
    const response = await api.put(`/comments/${id}`, data);
    return response.data;
  },

  deleteComment: async (id: string): Promise<void> => {
    await api.delete(`/comments/${id}`);
  },
};
