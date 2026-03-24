import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ArticleIcon from '@mui/icons-material/Article';
import type { Post, User } from '../../types/index';

interface FeaturedPostsSectionProps {
  posts: Post[];
  user: User | null;
}

export const FeaturedPostsSection: React.FC<FeaturedPostsSectionProps> = ({ posts, user }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: '#fff' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#1a1a1a',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              letterSpacing: '-0.5px',
            }}
          >
            Featured Stories
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#717171',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: '1rem',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Discover compelling stories from our community
          </Typography>
        </Box>

        {posts.length > 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={3} sx={{ maxWidth: '1200px' }}>
              {posts.map((post) => (
                <Grid item xs={12} sm={6} lg={4} key={post._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card
                    sx={{
                      width: '300px',
                      height: '250px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '1px solid #e0e0e0',
                      borderLeft: '4px solid #1565c0',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        boxShadow: '0 8px 20px rgba(21, 101, 192, 0.1)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                    onClick={() => navigate(`/posts/${post._id}`)}
                  >
                    {post.image && (
                      <Box
                        sx={{
                          height: 140,
                          overflow: 'hidden',
                          background: '#f5f5f5',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </Box>
                    )}
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', py: 2, px: 2.5 }}>
                      <Box sx={{ mb: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            backgroundColor: '#e3f2fd',
                            color: '#1565c0',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            display: 'inline-block',
                          }}
                        >
                          {post.category.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 0.8,
                          color: '#1a1a1a',
                          fontSize: '0.95rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          mb: 1.5,
                          flex: 1,
                          height: 32,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: 1.3,
                          fontSize: '0.8rem',
                        }}
                      >
                        {post.content}
                      </Typography>
                      <Divider sx={{ my: 1, borderColor: '#e0e0e0' }} />
                      <Stack direction="row" spacing={1.5} sx={{ pt: 0.5 }}>
                        <Stack direction="row" spacing={0.3} alignItems="center">
                          <FavoriteBorderIcon sx={{ fontSize: 14, color: '#1565c0' }} />
                          <Typography variant="caption" sx={{ fontWeight: 500, color: '#717171', fontSize: '0.75rem' }}>
                            {post.likes}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.3} alignItems="center">
                          <CommentIcon sx={{ fontSize: 14, color: '#1565c0' }} />
                          <Typography variant="caption" sx={{ fontWeight: 500, color: '#717171', fontSize: '0.75rem' }}>
                            {post.commentsCount}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              px: 3,
              background: '#f5f9fb',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
            }}
          >
            <ArticleIcon sx={{ fontSize: 50, color: '#bdbdbd', mb: 2 }} />
            <Typography color="textSecondary" sx={{ fontSize: '1rem', mb: 3 }}>
              No posts available yet
            </Typography>
            {!user && (
              <Button
                variant="contained"
                size="medium"
                onClick={() => navigate('/register')}
                sx={{ background: '#1565c0' }}
              >
                Get Started
              </Button>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};
