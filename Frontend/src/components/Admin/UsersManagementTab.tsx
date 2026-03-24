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
  Typography,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { User } from '../../types/index';

interface UsersManagementTabProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UsersManagementTab: React.FC<UsersManagementTabProps> = ({
  users,
  loading,
  onEdit,
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id} hover>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: u.role === 'admin' ? '#fef3c7' : '#dbeafe',
                      color: u.role === 'admin' ? '#92400e' : '#1e40af',
                      fontSize: '0.875rem',
                    }}
                  >
                    {u.role}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(u)}
                    sx={{ color: '#1565c0' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(u._id)}
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
