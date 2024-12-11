const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
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
    trim: true,
    required: false,
    validate: {
      validator: function(v) {
        // Return true if phone is empty/null/undefined or has at least 7 digits
        return !v || v.replace(/\D/g, '').length >= 7;
      },
      message: 'Please provide a phone number with at least 7 digits'
    }
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded'],
    default: 'new'
  },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: false
  },
  tournamentName: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to handle empty fields
ContactSchema.pre('save', function(next) {
  if (!this.phone) this.phone = undefined;
  if (!this.tournamentId) this.tournamentId = undefined;
  if (!this.tournamentName) this.tournamentName = undefined;
  next();
});

module.exports = mongoose.model('Contact', ContactSchema);