import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useHabits } from '../context/HabitContext';
import { useAuth } from '../context/AuthContext';
import '../config/chart'; // Import Chart.js configuration

const habitTypes = [
  { value: 'carpooling', label: 'Carpooling' },
  { value: 'reused-container', label: 'Reused Container' },
  { value: 'skipped-meat', label: 'Skipped Meat' },
  { value: 'public-transport', label: 'Public Transport' },
  { value: 'no-plastic', label: 'No Plastic' },
  { value: 'other', label: 'Other' }
];

const Dashboard = () => {
  const { user } = useAuth();
  const { habits, stats, loading, error, fetchHabits, fetchStats, logHabit } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState('');

  useEffect(() => {
    fetchHabits();
    fetchStats();
  }, [fetchHabits, fetchStats]);

  const handleHabitSubmit = async () => {
    if (selectedHabit) {
      try {
        await logHabit({ type: selectedHabit });
        setSelectedHabit('');
        await fetchStats(); // Refresh stats after logging
      } catch (err) {
        // Error is handled by context
      }
    }
  };

  const chartData = {
    labels: habitTypes.map(h => h.label),
    datasets: [
      {
        label: 'Habits Logged',
        data: habitTypes.map(
          (type) => habits.filter((h) => h.type === type.value).length
        ),
        backgroundColor: '#4caf50',
      },
    ],
  };

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user?.name}!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Track your eco-friendly habits and make a difference.
            </Typography>
          </Paper>
        </Grid>

        {/* Log New Habit Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Log New Habit
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Habit</InputLabel>
              <Select
                value={selectedHabit}
                label="Select Habit"
                onChange={(e) => setSelectedHabit(e.target.value)}
              >
                {habitTypes.map((habit) => (
                  <MenuItem key={habit.value} value={habit.value}>
                    {habit.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleHabitSubmit}
              disabled={!selectedHabit}
            >
              Log Habit
            </Button>
          </Paper>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Eco Points
                  </Typography>
                  <Typography variant="h4">
                    {stats?.totalPoints || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Current Streak
                  </Typography>
                  <Typography variant="h4">
                    {stats?.currentStreak || 0} days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Habits
                  </Typography>
                  <Typography variant="h4">{habits.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Habits Overview
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
      </Grid>
    </Container>
  );
};

export default Dashboard; 