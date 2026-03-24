import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';

interface StatisticsSectionProps {
  stats: {
    users: number;
    posts: number;
    categories: number;
  };
}

const STAT_ITEMS = [
  { icon: PersonIcon, label: 'Active Users', key: 'users' as const },
  { icon: ArticleIcon, label: 'Total Posts', key: 'posts' as const },
  { icon: CategoryIcon, label: 'Categories', key: 'categories' as const },
];

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
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
            PostSpace by the Numbers
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
            A growing platform for creators worldwide
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={3} sx={{ maxWidth: '1200px' }}>
            {STAT_ITEMS.map((item, idx) => (
              <Grid item xs={12} sm={6} lg={4} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    background: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    width: '100%',
                    maxWidth: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: '#e3f2fd',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                    }}
                  >
                    <item.icon sx={{ fontSize: 40, color: '#1565c0' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1565c0', mb: 0.5, fontSize: '2rem' }}>
                    {stats[item.key].toLocaleString()}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {item.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
