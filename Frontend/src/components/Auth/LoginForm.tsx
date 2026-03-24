import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { ErrorAlert } from '../Common/ErrorAlert';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      clearError();
      await login(formData.email, formData.password);
      onSuccess?.();
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
      <CardHeader title="Login" titleTypographyProps={{ variant: 'h5' }} />
      <CardContent>
        {error && <ErrorAlert message={error} onClose={clearError} />}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            fullWidth
            disabled={loading}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            fullWidth
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <MuiLink href="/register" sx={{ cursor: 'pointer', fontWeight: 500 }}>
                Register here
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
