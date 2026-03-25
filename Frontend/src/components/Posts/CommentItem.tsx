import React from 'react';
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Comment } from '../../types/index';

interface CommentItemProps {
  comment: Comment;
  isAuthor: boolean;
  showDivider?: boolean;
  onDelete: () => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isAuthor,
  showDivider = true,
  onDelete,
}) => {
  return (
    <Box>
      {showDivider && <Divider />}
      <ListItem
        secondaryAction={
          isAuthor && (
            <IconButton
              edge="end"
              onClick={onDelete}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          )
        }
        sx={{ paddingY: 2 }}
      >
        <ListItemAvatar>
          <Avatar>{comment.author.name.charAt(0).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment.author.name}
          secondary={
            <>
              <Typography component="span" variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </Typography>
              <Typography component="span" variant="body2" sx={{ marginTop: 0.5, display: 'block' }}>
                {comment.content}
              </Typography>
            </>
          }
        />
      </ListItem>
    </Box>
  );
};
