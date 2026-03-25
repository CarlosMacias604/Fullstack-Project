import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { Post } from '../../types/index';

interface PostsManagementTabProps {
  posts: Post[];
  loading: boolean;
  onView: (post: Post) => void;
  onDelete: (postId: string) => void;
}

export const PostsManagementTab: React.FC<PostsManagementTabProps> = ({
  posts,
  loading,
  onView,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((p) => (
              <TableRow key={p._id} hover>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.author.name}</TableCell>
                <TableCell>{p.category.name}</TableCell>
                <TableCell>{p.likes}</TableCell>
                <TableCell>{p.commentsCount}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => onView(p)}
                    sx={{ color: '#1565c0' }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(p._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
