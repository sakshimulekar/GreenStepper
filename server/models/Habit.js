const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'carpooling',
      'reused-container',
      'skipped-meat',
      'public-transport',
      'no-plastic',
      'other'
    ]
  },
  notes: {
    type: String,
    trim: true
  },
  ecoPoints: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
habitSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('Habit', habitSchema); 