import api from './api';

interface LikeResponse {
  message: string;
  likes: number;
}

interface LikeStatusResponse {
  likes: number;
  userLiked: boolean;
}

export const likeService = {
  addLike: async (postId: string): Promise<LikeResponse> => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },

  removeLike: async (postId: string): Promise<LikeResponse> => {
    const response = await api.delete(`/posts/${postId}/like`);
    return response.data;
  },

  getLikeStatus: async (postId: string): Promise<LikeStatusResponse> => {
    const response = await api.get(`/posts/${postId}/likes`);
    return response.data;
  },
};
