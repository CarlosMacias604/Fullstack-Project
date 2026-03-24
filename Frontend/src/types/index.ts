// TypeScript interfaces and types for PostSpace

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'host' | 'admin';
}

// Category type
export interface Category {
  _id: string;
  name: string;
}

// Post type
export interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: User;
  category: Category;
  createdAt: string;
  likes: number;
  commentsCount: number;
  userLiked?: boolean;
}

// Comment type
export interface Comment {
  _id: string;
  content: string;
  author: User;
  post: string;
  createdAt: string;
}

// Auth response
export interface AuthResponse {
  token: string;
  refreshToken: string;
}

// Auth credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: string | 'host' | 'admin';
}

// Paginated response
export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  posts?: T[];
  comments?: T[];
  users?: T[];
  items?: T[];
  query?: string;
}

// API Error response
export interface ErrorResponse {
  message: string;
  status?: number;
}

// Context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export interface PostContextType {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  fetchPosts: (page?: number, limit?: number) => Promise<void>;
  fetchPost: (id: string) => Promise<void>;
  createPost: (title: string, content: string, categoryId: string, image?: string) => Promise<Post>;
  updatePost: (id: string, data: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  searchPosts: (query: string, category?: string, page?: number) => Promise<void>;
  addLike: (postId: string) => Promise<void>;
  removeLike: (postId: string) => Promise<void>;
  clearError: () => void;
}
