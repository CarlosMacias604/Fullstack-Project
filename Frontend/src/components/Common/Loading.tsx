import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...', fullScreen = false }) => {
  const containerStyle = fullScreen
    ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      };

  return (
    <Box sx={containerStyle}>
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress size={50} />
        <Typography variant="body1" sx={{ marginTop: 2, color: 'text.secondary' }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
};
