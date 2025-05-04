const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const Habit = require('../models/Habit');
const User = require('../models/User');

// Eco-points mapping
const ecoPointsMap = {
  'carpooling': 1.5,
  'reused-container': 1,
  'skipped-meat': 2,
  'public-transport': 1.5,
  'no-plastic': 1,
  'other': 1
};

// @route   POST /api/habits
// @desc    Log a new eco-habit
// @access  Private
router.post(
  '/',
  protect,
  [
    body('type').isIn(Object.keys(ecoPointsMap)).withMessage('Invalid habit type'),
    body('notes').optional().isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { type, notes } = req.body;
      const ecoPoints = ecoPointsMap[type];

      // Check if user has already logged a habit today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const existingHabit = await Habit.findOne({
        user: req.user.id,
        date: { $gte: today }
      });

      if (existingHabit) {
        return res.status(400).json({ message: 'You have already logged a habit today' });
      }

      // Create new habit
      const habit = new Habit({
        user: req.user.id,
        type,
        notes,
        ecoPoints
      });

      await habit.save();

      // Update user's ecoPoints
      const user = await User.findById(req.user.id);
      user.ecoPoints += ecoPoints;

      // Update streaks
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayHabit = await Habit.findOne({
        user: req.user.id,
        date: { $gte: yesterday, $lt: today }
      });

      if (yesterdayHabit) {
        user.currentStreak += 1;
        if (user.currentStreak > user.longestStreak) {
          user.longestStreak = user.currentStreak;
        }
      } else {
        user.currentStreak = 1;
      }

      // Update badges based on ecoPoints
      if (user.ecoPoints >= 100 && !user.badges.includes('eco-warrior')) {
        user.badges.push('eco-warrior');
      }
      if (user.ecoPoints >= 500 && !user.badges.includes('sustainability-champion')) {
        user.badges.push('sustainability-champion');
      }
      if (user.ecoPoints >= 1000 && !user.badges.includes('green-guru')) {
        user.badges.push('green-guru');
      }

      await user.save();

      res.status(201).json(habit);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET /api/habits
// @desc    Get user's habits
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id })
      .sort({ date: -1 });
    res.json(habits);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/habits/stats
// @desc    Get user's habit statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Habit.aggregate([
      { $match: { user: req.user.id } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalPoints: { $sum: '$ecoPoints' }
        }
      }
    ]);

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 