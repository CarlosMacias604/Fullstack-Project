import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';

interface AdminStatsProps {
  totalUsers: number;
  totalPosts: number;
  totalCategories: number;
}

export const AdminStats: React.FC<AdminStatsProps> = ({
  totalUsers,
  totalPosts,
  totalCategories,
}) => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
      <Card sx={{ flex: 1, borderTop: '4px solid #1565c0' }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom sx={{ color: '#1565c0', fontWeight: 600 }}>
            Total Users
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a1a1a' }}>{totalUsers}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1, borderTop: '4px solid #1565c0' }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom sx={{ color: '#1565c0', fontWeight: 600 }}>
            Total Posts
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a1a1a' }}>{totalPosts}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1, borderTop: '4px solid #1565c0' }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom sx={{ color: '#1565c0', fontWeight: 600 }}>
            Total Categories
          </Typography>
          <Typography variant="h4" sx={{ color: '#1a1a1a' }}>{totalCategories}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};
