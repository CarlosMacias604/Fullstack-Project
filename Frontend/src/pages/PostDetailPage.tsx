import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Typography,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Loading } from '../components/Common/Loading';
import { ErrorAlert } from '../components/Common/ErrorAlert';
import { PostDisplay } from '../components/Posts/PostDisplay';
import { CommentForm } from '../components/Posts/CommentForm';
import { CommentsList } from '../components/Posts/CommentsList';
import type { Post, Comment } from '../types/index';
import { postService } from '../services/postService';
import { commentService } from '../services/commentService';
import { likeService } from '../services/likeService';
import { useAuth } from '../hooks/useAuth';

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadPostAndComments();
    }
  }, [id]);

  const loadPostAndComments = async () => {
    try {
      setLoading(true);
      setError(null);

      const postData = await postService.getPost(id!);
      setPost(postData);
      setLikesCount(postData.likes);
      setLiked(postData.userLiked || false);

      const commentsData = await commentService.getComments(id!);
      setComments(commentsData.comments || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load post';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setCommentLoading(true);
      await commentService.createComment(id!, { content: newComment });
      setNewComment('');
      await loadPostAndComments();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add comment';
      setError(message);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await commentService.deleteComment(commentId);
      await loadPostAndComments();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete comment';
      setError(message);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await likeService.removeLike(id!);
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await likeService.addLike(id!);
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to like post';
      setError(message);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!post) {
    return (
      <DashboardLayout>
        <ErrorAlert message={error || 'Post not found'} />
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 800, margin: '0 auto', marginY: 3 }}>
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

        {/* Post Display */}
        <PostDisplay
          post={post}
          liked={liked}
          likesCount={likesCount}
          onLike={handleLike}
        />

        {/* Comments Section */}
        <Card>
          <CardHeader title={`Comments (${comments.length})`} />

          <CardContent>
            {/* Comment Form */}
            <CommentForm
              value={newComment}
              onChange={setNewComment}
              onSubmit={handleAddComment}
              loading={commentLoading}
            />

            <Divider sx={{ marginBottom: 2 }} />

            {/* Comments List */}
            <CommentsList
              comments={comments}
              currentUserId={user?._id}
              onDeleteComment={handleDeleteComment}
            />
          </CardContent>
        </Card>

        <Button
          sx={{ marginTop: 3 }}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>
    </DashboardLayout>
  );
};
