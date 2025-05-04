const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Habit = require('../models/Habit');
const User = require('../models/User');

// @route   GET /api/stats/global
// @desc    Get global statistics
// @access  Public
router.get('/global', async (req, res) => {
  try {
    // Get total eco-points across all users
    const totalEcoPoints = await User.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$ecoPoints' }
        }
      }
    ]);

    // Get total number of users
    const totalUsers = await User.countDocuments();

    // Get total habits logged
    const totalHabits = await Habit.countDocuments();

    // Get habits by type
    const habitsByType = await Habit.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get average eco-points per user
    const avgEcoPoints = totalEcoPoints[0]?.total / totalUsers || 0;

    res.json({
      totalEcoPoints: totalEcoPoints[0]?.total || 0,
      totalUsers,
      totalHabits,
      habitsByType,
      avgEcoPoints
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/stats/leaderboard
// @desc    Get top users by eco-points
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find()
      .select('name ecoPoints badges')
      .sort({ ecoPoints: -1 })
      .limit(10);

    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 