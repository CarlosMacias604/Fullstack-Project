import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import type { Post } from '../types/index';
import { postService } from '../services/postService';
import api from '../services/api';
import { HeroSection } from '../components/Home/HeroSection';
import { FeaturesSection } from '../components/Home/FeaturesSection';
import { FeaturedPostsSection } from '../components/Home/FeaturedPostsSection';
import { StatisticsSection } from '../components/Home/StatisticsSection';
import { CTASection } from '../components/Home/CTASection';
import { Footer } from '../components/Home/Footer';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState({ users: 0, posts: 0, categories: 0 });

  useEffect(() => {
    loadFeaturedPosts();
    loadRealStats();
  }, []);

  const loadFeaturedPosts = async () => {
    try {
      const response = await postService.getPosts(1, 3);
      setPosts(response.posts || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const loadRealStats = async () => {
    try {
      const usersRes = await api.get('/users?page=1&limit=1');
      const userCount = usersRes.data?.total || 0;

      const postsRes = await api.get('/posts?page=1&limit=1');
      const postCount = postsRes.data?.total || 0;

      const categoriesRes = await api.get('/categories?page=1&limit=100');
      const categoryCount = Array.isArray(categoriesRes.data)
        ? categoriesRes.data.length
        : categoriesRes.data?.categories?.length || 0;

      setStats({
        users: userCount,
        posts: postCount,
        categories: categoryCount,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats({ users: 0, posts: 0, categories: 0 });
    }
  };

  return (
    <Box>
      <HeroSection user={user} />
      <FeaturesSection />
      <FeaturedPostsSection posts={posts} user={user} />
      <StatisticsSection stats={stats} />
      <CTASection user={user} />
      <Footer user={user} />
    </Box>
  );
};
