import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
  Stack,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { PostCard } from '../components/Posts/PostCard';
import { ErrorAlert } from '../components/Common/ErrorAlert';
import type { Post } from '../types/index';
import { postService } from '../services/postService';

const POSTS_PER_PAGE = 10;

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchQuery) {
      searchPosts(page);
    }
  }, [searchQuery, page]);

  const searchPosts = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postService.searchPosts(
        searchQuery,
        categoryFilter,
        pageNum,
        POSTS_PER_PAGE
      );
      setPosts(response.posts || []);
      setTotalPages(Math.ceil((response.total || 0) / POSTS_PER_PAGE));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
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
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Search Results
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchQuery && `Results for: "${searchQuery}"`}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
          >
            New Post
          </Button>
        </Box>

        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: 4 }}>
            <CircularProgress />
          </Box>
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
              No posts found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try searching with different keywords
            </Typography>
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
