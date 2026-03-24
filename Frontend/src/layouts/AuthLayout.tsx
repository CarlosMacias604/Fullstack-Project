import React from 'react';
import { Box, Container, Paper } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#fafafa',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ padding: 0 }}>
          {children}
        </Paper>
      </Container>
    </Box>
  );
};
