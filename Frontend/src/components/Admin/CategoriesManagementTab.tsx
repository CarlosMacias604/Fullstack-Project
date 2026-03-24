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
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import type { Category } from '../../types/index';

interface CategoriesManagementTabProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  onAdd: () => void;
}

export const CategoriesManagementTab: React.FC<CategoriesManagementTabProps> = ({
  categories,
  loading,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{ mb: 2 }}
      >
        Add Category
      </Button>
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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((c) => (
                <TableRow key={c._id} hover>
                  <TableCell>{c.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(c)}
                      sx={{ color: '#1565c0' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(c._id)}
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
    </Box>
  );
};
