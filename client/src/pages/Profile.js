import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material';
import {
  EmojiEvents as BadgeIcon,
  LocalFireDepartment as StreakIcon,
  Nature as EcoIcon,
} from '@mui/icons-material';

const Profile = () => {
  const { user } = useAuth();

  const badgeColors = {
    'newbie': 'primary',
    'eco-warrior': 'success',
    'sustainability-champion': 'warning',
    'green-guru': 'error',
  };

  const badgeLabels = {
    'newbie': 'Newbie',
    'eco-warrior': 'Eco Warrior',
    'sustainability-champion': 'Sustainability Champion',
    'green-guru': 'Green Guru',
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* User Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                  mb: 2,
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Achievements
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EcoIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        {user?.ecoPoints || 0}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary">
                      Total Eco-Points
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StreakIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        {user?.currentStreak || 0}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary">
                      Current Streak
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StreakIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        {user?.longestStreak || 0}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary">
                      Longest Streak
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Badges */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Badges
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {user?.badges?.map((badge) => (
                  <Chip
                    key={badge}
                    icon={<BadgeIcon />}
                    label={badgeLabels[badge]}
                    color={badgeColors[badge]}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>

            {/* Environmental Impact */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Environmental Impact
              </Typography>
              <Typography variant="body1" paragraph>
                Through your eco-friendly actions, you've contributed to saving
                approximately {Math.round((user?.ecoPoints || 0) * 0.5)} kg of CO₂
                emissions.
              </Typography>
              <Typography variant="body1" paragraph>
                Keep up the great work! Every small action counts towards a more
                sustainable future.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 