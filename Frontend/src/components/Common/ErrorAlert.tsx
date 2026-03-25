import React from 'react';
import { Alert, AlertTitle, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorAlertProps {
  message: string | null;
  onClose?: () => void;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onClose,
  severity = 'error',
}) => {
  if (!message) return null;

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Alert
        severity={severity}
        action={
          onClose ? (
            <IconButton size="small" color="inherit" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          ) : null
        }
      >
        <AlertTitle>{severity === 'error' ? 'Error' : severity === 'warning' ? 'Warning' : severity === 'info' ? 'Info' : 'Success'}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};
