const mongoose = require('mongoose');

const StandingSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true
  },
  league: {
    type: String,
    required: true,
    enum: ['business', 'junior'],
    lowercase: true
  },
  season: {
    type: String,
    required: true
  },
  totalPoints: {
    type: Number,
    required: true,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  position: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
StandingSchema.index({ league: 1, season: 1 });
StandingSchema.index({ playerName: 1, league: 1, season: 1 }, { unique: true });

module.exports = mongoose.model('Standing', StandingSchema);