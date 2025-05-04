import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const FeatureCard = ({ title, description }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledPaper elevation={3}>
      <Typography 
        variant={isMobile ? 'h5' : 'h4'} 
        gutterBottom 
        sx={{ 
          color: 'primary.main', 
          mb: isMobile ? 1 : 2,
          fontWeight: 'bold'
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant={isMobile ? 'body2' : 'body1'} 
        color="text.secondary"
        sx={{ lineHeight: 1.6 }}
      >
        {description}
      </Typography>
    </StyledPaper>
  );
};

const Landing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          color: 'primary.main',
          py: isMobile ? 4 : 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h4' : 'h2'}
                component="h1"
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  mb: isMobile ? 2 : 4
                }}
              >
                Track Your Green Journey
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h5'} 
                sx={{ 
                  mb: isMobile ? 3 : 4, 
                  opacity: 0.9,
                  lineHeight: 1.4
                }}
              >
                Make sustainable living a habit with GreenSteps
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  size={isMobile ? 'medium' : 'large'}
                  sx={{ 
                    minWidth: isMobile ? '140px' : 'auto',
                    px: isMobile ? 2 : 3
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="primary"
                  size={isMobile ? 'medium' : 'large'}
                  sx={{ 
                    minWidth: isMobile ? '140px' : 'auto',
                    px: isMobile ? 2 : 3
                  }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/eco-hero.svg"
                alt="Eco-friendly lifestyle"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  display: 'block',
                  mx: 'auto',
                  mt: isMobile ? 4 : 0
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: isMobile ? 4 : 8 }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align="center"
          gutterBottom
          sx={{ 
            mb: isMobile ? 4 : 6, 
            fontWeight: 'bold',
            px: isMobile ? 2 : 0
          }}
        >
          Why Choose GreenSteps?
        </Typography>
        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              title="Track Eco-Habits"
              description="Monitor your daily sustainable activities and their environmental impact"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              title="Progress Tracking"
              description="Visualize your green journey with detailed statistics and charts"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              title="Community Impact"
              description="Join a community of eco-conscious individuals making a difference"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              title="Earn Rewards"
              description="Get recognized for your sustainable efforts with eco-points and badges"
            />
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'primary.light',
          py: isMobile ? 6 : 10,
          textAlign: 'center',
          mt: isMobile ? 6 : 10,
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              px: isMobile ? 2 : 0
            }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography 
            variant={isMobile ? 'body1' : 'h6'} 
            sx={{ 
              mb: isMobile ? 3 : 4, 
              opacity: 0.9,
              px: isMobile ? 2 : 0
            }}
          >
            Join thousands of users who are tracking their sustainable habits
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="secondary"
            size={isMobile ? 'medium' : 'large'}
            sx={{ 
              minWidth: isMobile ? '160px' : 'auto',
              px: isMobile ? 3 : 4
            }}
          >
            Start Your Green Journey
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing; 