import React from 'react';
import {
  List,
  Typography,
} from '@mui/material';
import { CommentItem } from './CommentItem';
import type { Comment } from '../../types/index';

interface CommentsListProps {
  comments: Comment[];
  currentUserId?: string;
  onDeleteComment: (commentId: string) => void;
}

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  currentUserId,
  onDeleteComment,
}) => {
  if (comments.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: 'center', padding: 2 }}>
        No comments yet. Be the first to comment!
      </Typography>
    );
  }

  return (
    <List>
      {comments.map((comment, index) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          isAuthor={currentUserId === comment.author._id}
          showDivider={index > 0}
          onDelete={() => onDeleteComment(comment._id)}
        />
      ))}
    </List>
  );
};
