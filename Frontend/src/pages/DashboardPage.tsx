import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Pagination,
  Button,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { PostCard } from '../components/Posts/PostCard';
import { Loading } from '../components/Common/Loading';
import { ErrorAlert } from '../components/Common/ErrorAlert';
import type { Post } from '../types/index';
import { postService } from '../services/postService';

const POSTS_PER_PAGE = 10;

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postService.getPosts(pageNum, POSTS_PER_PAGE);
      setPosts(response.posts || []);
      setTotalPages(Math.ceil((response.total || 0) / POSTS_PER_PAGE));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    navigate(`/search?q=${query}`);
  };

  const handleLikeChange = (postId: string, newLikesCount: number) => {
   setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: newLikesCount } : post
      )
    );
  };

  return (
    <DashboardLayout onSearch={handleSearch}>
      <Box sx={{ paddingY: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Latest Posts
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
            size="large"
          >
            New Post
          </Button>
        </Box>

        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

        {loading && posts.length === 0 ? (
          <Loading message="Loading posts..." />
        ) : posts.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              paddingY: 8,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No posts yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
              Be the first to share something interesting!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/create')}
            >
              Create First Post
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <PostCard
                    post={post}
                    onLikeChange={handleLikeChange}
                  />
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Stack sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Stack>
            )}
          </>
        )}
      </Box>
    </DashboardLayout>
  );
};
