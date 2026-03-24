import React from 'react';
import { Box, Container, Typography, Grid, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import type { User } from '../../types/index';

interface FooterProps {
  user: User | null;
}

export const Footer: React.FC<FooterProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: '#0f111a',
        color: '#fff',
        py: { xs: 6, md: 8 },
        borderTop: '1px solid #1a2740',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#1565c0',
                fontSize: '1.1rem',
              }}
            >
              PostSpace
            </Typography>
            <Typography color="rgba(255,255,255,0.6)" variant="body2" sx={{ lineHeight: 1.7, fontSize: '0.9rem' }}>
              A modern platform for creators to share stories and connect worldwide.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ fontWeight: 700, mb: 2, color: '#fff', fontSize: '1rem' }}>
              Platform
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Explore', action: () => user ? navigate('/dashboard') : navigate('/login') },
                { label: 'Categories', action: () => { } },
                { label: 'For Creators', action: () => { } },
              ].map((item) => (
                <Typography
                  key={item.label}
                  component="a"
                  onClick={item.action}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                    '&:hover': { color: '#1565c0' },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ fontWeight: 700, mb: 2, color: '#fff', fontSize: '1rem' }}>
              Company
            </Typography>
            <Stack spacing={1.5}>
              {['About Us', 'Privacy Policy', 'Contact'].map((item) => (
                <Typography
                  key={item}
                  component="a"
                  href="#"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#1565c0' },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ fontWeight: 700, mb: 2, color: '#fff', fontSize: '1rem' }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {[
                { component: FacebookIcon },
                { component: XIcon },
                { component: InstagramIcon },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 40,
                    height: 40,
                    background: 'rgba(21, 101, 192, 0.15)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: '#1565c0',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <item.component sx={{ fontSize: 20, color: '#1565c0', '&:hover': { color: '#fff' } }} />
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#1a2740' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
          }}
        >
          <Typography color="rgba(255,255,255,0.5)" variant="body2" sx={{ fontSize: '0.85rem' }}>
            © 2026 PostSpace. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Typography
                key={item}
                component="a"
                href="#"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#1565c0' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
