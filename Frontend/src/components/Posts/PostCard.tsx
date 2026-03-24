import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Stack,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { Post } from '../../types/index';
import { useNavigate } from 'react-router-dom';
import { likeService } from '../../services/likeService';

interface PostCardProps {
  post: Post;
  onLikeChange?: (postId: string, newLikesCount: number, userLiked: boolean) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLikeChange }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.userLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);

    try {
      if (liked) {
        await likeService.removeLike(post._id);
        setLiked(false);
        setLikesCount((prev) => prev - 1);
        onLikeChange?.(post._id, likesCount - 1, false);
      } else {
        await likeService.addLike(post._id);
        setLiked(true);
        setLikesCount((prev) => prev + 1);
        onLikeChange?.(post._id, likesCount + 1, true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const excerpt = post.content.substring(0, 120) + (post.content.length > 120 ? '...' : '');

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      {post.image && (
        <CardMedia
          component="img"
          height="200"
          image={post.image || 'https://via.placeholder.com/400x200'}
          alt={post.title}
          onClick={() => navigate(`/posts/${post._id}`)}
          sx={{
            cursor: 'pointer',
            objectFit: 'cover',
          }}
        />
      )}

      <CardHeader
        avatar={
          <Avatar sx={{ cursor: 'pointer', backgroundColor: '#1565c0' }} onClick={() => navigate(`/users/${post.author._id}`)}>
            {post.author.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <Tooltip title="More options">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
        title={post.author.name}
        subheader={formattedDate}
        onClick={() => navigate(`/posts/${post._id}`)}
        sx={{ cursor: 'pointer' }}
      />

      <CardContent onClick={() => navigate(`/posts/${post._id}`)} sx={{ cursor: 'pointer' }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, marginBottom: 1 }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          {excerpt}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="caption" sx={{ backgroundColor: '#e3f2fd', color: '#1565c0', padding: '4px 8px', borderRadius: 1, fontWeight: 500 }}>
            {post.category.name}
          </Typography>
        </Box>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: 2,
          paddingBottom: 1.5,
          borderTop: '2px solid #bbdefb',
        }}
      >
        <Stack direction="row" spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title={liked ? 'Unlike' : 'Like'}>
              <IconButton
                size="small"
                onClick={handleLikeClick}
                disabled={loading}
                sx={{
                  color: liked ? 'error.main' : '#717171',
                  '&:hover': {
                    color: '#e53935',
                  },
                }}
              >
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
            <Typography variant="caption">{likesCount}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title="Comments">
              <IconButton
                size="small"
                onClick={() => navigate(`/posts/${post._id}`)}
                sx={{ color: '#1565c0' }}
              >
                <CommentIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="caption">{post.commentsCount}</Typography>
          </Box>
        </Stack>

        <Button
          size="small"
          variant="text"
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          Read More
        </Button>
      </Box>
    </Card>
  );
};
