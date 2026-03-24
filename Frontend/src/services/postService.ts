import api from './api';
import type { Post, PaginatedResponse } from '../types/index';

interface CreatePostData {
  title: string;
  content: string;
  author: string;
  category: string;
  image?: string;
}

export const postService = {
  getPosts: async (page = 1, limit = 10): Promise<PaginatedResponse<Post>> => {
    const response = await api.get('/posts', {
      params: { page, limit },
    });
    return response.data;
  },

  getPost: async (id: string): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (data: CreatePostData): Promise<{ message: string; post: Post }> => {
    const response = await api.post('/posts', data);
    return response.data;
  },

  updatePost: async (id: string, data: Partial<CreatePostData>): Promise<Post> => {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  searchPosts: async (
    query: string,
    category?: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Post>> => {
    const response = await api.get('/search', {
      params: { query, category, page, limit },
    });
    return response.data;
  },

  // Utility function to get user posts
  getUserPosts: async (userId: string, page = 1, limit = 10): Promise<PaginatedResponse<Post>> => {
    const response = await api.get('/posts', {
      params: { page, limit },
    });
    // Filter posts by author (this could be done server-side in future)
    return {
      ...response.data,
      posts: response.data.posts.filter((post: Post) => post.author._id === userId),
    };
  },
};
