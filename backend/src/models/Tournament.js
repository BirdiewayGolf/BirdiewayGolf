// backend/src/models/Tournament.js
const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  league: { // Changed from type since you're using league in the frontend
    type: String,
    required: true,
    enum: ['business', 'amateur', 'junior']
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  entryFee: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  maxPlayers: { // This matches what your model expects
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  // Additional fields from your form that might be useful
  startTime: String,
  courseName: String,
  courseAddress: String,
  handicapRequirements: String,
  prizeDistribution: String,
  rules: String,
  contactEmail: String,
  contactPhone: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String, // Since we're using hardcoded user IDs
    required: true
  }
});

module.exports = mongoose.model('Tournament', tournamentSchema);