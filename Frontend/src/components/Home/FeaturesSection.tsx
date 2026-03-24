import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import PeopleIcon from '@mui/icons-material/People';
import ExploreIcon from '@mui/icons-material/Explore';

const FEATURES = [
  {
    icon: SpeakerNotesIcon,
    title: 'Easy Publishing',
    desc: 'Share your thoughts and stories. Simple, fast, and intuitive.'
  },
  {
    icon: PeopleIcon,
    title: 'Vibrant Community',
    desc: 'Connect with like-minded creators and build meaningful relationships.'
  },
  {
    icon: ExploreIcon,
    title: 'Discover Content',
    desc: 'Find and explore posts tailored to your interests and passions.'
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: '#f5f9fb' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#1a1a1a',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              letterSpacing: '-0.5px',
            }}
          >
            Why Choose PostSpace?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#717171',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: '1rem',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            A modern platform designed for creators
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={3} sx={{ maxWidth: '1200px' }}>
            {FEATURES.map((feature, idx) => (
              <Grid item xs={12} sm={6} lg={4} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: '360px',
                    height: '280px',
                    border: '1px solid #e0e0e0',
                    borderLeft: '4px solid #1565c0',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: '0 8px 20px rgba(21, 101, 192, 0.1)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ py: 4, px: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        background: '#e3f2fd',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2.5,
                      }}
                    >
                      <feature.icon sx={{ fontSize: 36, color: '#1565c0' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: '#1a1a1a' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6, flex: 1 }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
