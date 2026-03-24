import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/index';

interface CTASectionProps {
  user: User | null;
}

export const CTASection: React.FC<CTASectionProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        color: '#fff',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            letterSpacing: '-0.5px',
            color: '#fff',
          }}
        >
          Ready to Share Your Story?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 6,
            opacity: 0.9,
            fontSize: { xs: '1rem', md: '1.1rem' },
            maxWidth: '500px',
            mx: 'auto',
            lineHeight: 1.8,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Join thousands of creators sharing their unique voice with the world.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ maxWidth: '450px', mx: 'auto' }}
        >
          {!user ? (
            <>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  background: '#fff',
                  color: '#1565c0',
                  fontWeight: 600,
                  padding: '12px 28px',
                  fontSize: '1rem',
                  borderRadius: 1,
                  '&:hover': {
                    background: '#f5f5f5',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: 'rgba(255,255,255,0.7)',
                  color: '#fff',
                  fontWeight: 600,
                  padding: '12px 28px',
                  fontSize: '1rem',
                  borderRadius: 1,
                  '&:hover': {
                    borderColor: '#fff',
                    background: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                Sign In
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/create')}
              sx={{
                background: '#fff',
                color: '#1565c0',
                fontWeight: 600,
                padding: '12px 28px',
                fontSize: '1rem',
                borderRadius: 1,
                '&:hover': {
                  background: '#f5f5f5',
                },
              }}
            >
              Create Your First Post
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};
