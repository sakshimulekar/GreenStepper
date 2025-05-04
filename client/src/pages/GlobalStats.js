import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useHabits } from '../context/HabitContext';
import '../config/chart'; // Import Chart.js configuration

const habitTypes = [
  'Recycling',
  'Public Transport',
  'Energy Saving',
  'Water Conservation',
  'Sustainable Shopping',
];

const ecoPointsMap = {
  'carpooling': 1.5,
  'reused-container': 1,
  'skipped-meat': 2,
  'public-transport': 1.5,
  'no-plastic': 1,
  'other': 1
};

const GlobalStats = () => {
  const { loading, error, fetchGlobalStats } = useHabits();
  const [globalStats, setGlobalStats] = useState(null);

  useEffect(() => {
    const loadGlobalStats = async () => {
      try {
        const stats = await fetchGlobalStats();
        setGlobalStats(stats);
      } catch (err) {
        // Error is handled by context
      }
    };
    loadGlobalStats();
  }, [fetchGlobalStats]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const chartData = {
    labels: habitTypes,
    datasets: [
      {
        label: 'Community Habits',
        data: habitTypes.map(
          (type) => globalStats?.habitDistribution?.[type] || 0
        ),
        backgroundColor: '#4caf50',
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Community Impact
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              See how our community is making a difference together.
            </Typography>
          </Paper>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Community Eco Points
              </Typography>
              <Typography variant="h4">
                {globalStats?.totalPoints || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h4">
                {globalStats?.totalUsers || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Habits Logged
              </Typography>
              <Typography variant="h4">
                {globalStats?.totalHabits || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Community Habits Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Environmental Impact */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Environmental Impact
            </Typography>
            <Typography variant="body1">
              Together, our community has saved approximately{' '}
              {((globalStats?.totalPoints || 0) * 0.5).toFixed(2)} kg of CO₂
              emissions through sustainable habits.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GlobalStats; 