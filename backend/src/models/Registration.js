// backend/src/models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  playerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  handicap: {
    type: Number,
    min: 0,
    max: 54 // Standard golf handicap range
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'waitlist', 'cancelled'],
    default: 'confirmed'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add an index to improve query performance
registrationSchema.index({ tournament: 1, registrationDate: -1 });

// Virtual for formatted date
registrationSchema.virtual('formattedDate').get(function() {
  return this.registrationDate.toLocaleDateString();
});

// Virtual for full payment status
registrationSchema.virtual('paymentStatusFormatted').get(function() {
  return this.paymentStatus.charAt(0).toUpperCase() + this.paymentStatus.slice(1);
});

// Method to check if registration can be cancelled
registrationSchema.methods.canBeCancelled = function() {
  return this.status !== 'cancelled';
};

module.exports = mongoose.model('Registration', registrationSchema);