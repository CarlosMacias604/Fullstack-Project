import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layouts/AuthLayout';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSuccess = () => {
    navigate('/login', {
      state: { successMessage: 'Registration successful! Please login.' }
    });
  };

  return (
    <AuthLayout>
      <Box sx={{ position: 'relative' }}>
        <Alert severity="info" sx={{ marginBottom: 2 }}>
          Create an account to start sharing your posts!
        </Alert>
        <RegisterForm onSuccess={handleRegisterSuccess} />
      </Box>
    </AuthLayout>
  );
};
