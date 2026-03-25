import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Box,
  Button,
  Divider,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { Post } from '../../types/index';

interface PostDisplayProps {
  post: Post;
  liked: boolean;
  likesCount: number;
  onLike: () => void;
}

export const PostDisplay: React.FC<PostDisplayProps> = ({
  post,
  liked,
  likesCount,
  onLike,
}) => {
  return (
    <Card sx={{ marginBottom: 3 }}>
      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
          }}
        />
      )}

      <CardHeader
        avatar={<Avatar>{post.author.name.charAt(0).toUpperCase()}</Avatar>}
        title={post.author.name}
        subheader={new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      />

      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 2 }}>
          {post.title}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2, lineHeight: 1.8 }}>
          {post.content}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            backgroundColor: '#f0f0f0',
            padding: '6px 12px',
            borderRadius: 1,
            display: 'inline-block',
          }}
        >
          {post.category.name}
        </Typography>
      </CardContent>

      <Divider />

      <Box sx={{ display: 'flex', gap: 2, padding: 2 }}>
        <Button
          startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          onClick={onLike}
          sx={{ color: liked ? 'error.main' : 'default' }}
        >
          {likesCount} Likes
        </Button>
      </Box>
    </Card>
  );
};
