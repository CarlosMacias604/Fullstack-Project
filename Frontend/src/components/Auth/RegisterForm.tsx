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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { ErrorAlert } from '../Common/ErrorAlert';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'host',
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setValidationError('Password must be at least 8 characters long');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      onSuccess?.();
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
      <CardHeader title="Register" titleTypographyProps={{ variant: 'h5' }} />
      <CardContent>
        {(error || validationError) && (
          <ErrorAlert message={error || validationError} onClose={clearError} />
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            fullWidth
            disabled={loading}
          />

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
            placeholder="Enter your password (min 8 characters)"
            required
            fullWidth
            disabled={loading}
          />

          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            fullWidth
            disabled={loading}
          />

          <FormControl fullWidth disabled={loading}>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="host">Host</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <MuiLink href="/login" sx={{ cursor: 'pointer', fontWeight: 500 }}>
                Login here
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
