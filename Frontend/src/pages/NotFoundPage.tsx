import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 700, color: '#667eea' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 600 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
          Sorry, the page you're looking for doesn't exist.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
