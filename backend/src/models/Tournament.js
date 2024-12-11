const mongoose = require('mongoose');

const PrizeSchema = new mongoose.Schema({
  place: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  value: {
    type: Number,
    min: 0,
    default: 0
  }
});

const TournamentSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    trim: true
  },
  date: {
    type: Date
  },
  league: {
    type: String,
    enum: ['business', 'junior', 'fundraiser', 'longday'],
    lowercase: true,
    default: 'business'
  },
  location: {
    type: String,
    trim: true
  },
  maxPlayers: {
    type: Number,
    min: 1,
    default: 999999 // Large default for unlimited
  },
  currentPlayers: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  registrationDeadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },

  // Schedule Information
  schedule: {
    startTime: {
      type: String
    },
    checkInTime: {
      type: String
    },
    format: {
      type: String,
      trim: true
    },
    estimatedEndTime: {
      type: String
    }
  },

  // Prizes
  prizes: [PrizeSchema],

  // Sponsor Information
  sponsorInfo: {
    name: {
      type: String,
      trim: true
    },
    logo: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },

  // Additional Details
  additionalDetails: {
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'all'],
      default: 'all'
    },
    equipment: {
      provided: {
        type: Boolean,
        default: false
      },
      details: {
        type: String,
        trim: true
      }
    },
    food: {
      included: {
        type: Boolean,
        default: false
      },
      details: {
        type: String,
        trim: true
      }
    },
    dresscode: {
      type: String,
      trim: true
    },
    cancelationPolicy: {
      type: String,
      trim: true
    }
  },

  // Rules and Amenities
  rules: [{
    type: String,
    trim: true
  }],
  amenities: [{
    type: String,
    trim: true
  }],

  // Contact Person
  contactPerson: {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true
});

// Add indexes
TournamentSchema.index({ date: 1 });
TournamentSchema.index({ league: 1 });
TournamentSchema.index({ status: 1 });

// Modified pre-save middleware to only check dates if both exist
TournamentSchema.pre('save', function(next) {
  if (this.registrationDeadline && this.date && this.registrationDeadline > this.date) {
    next(new Error('Registration deadline must be before tournament date'));
  }
  next();
});

// Virtual for checking if registration is open
TournamentSchema.virtual('registrationOpen').get(function() {
  const now = new Date();
  // Modified to handle optional registrationDeadline
  return (!this.registrationDeadline || now <= this.registrationDeadline) && 
         this.currentPlayers < this.maxPlayers &&
         this.status === 'upcoming';
});

// Method to check if tournament is full
TournamentSchema.methods.isFull = function() {
  return this.currentPlayers >= this.maxPlayers;
};

// Method to increment current players
TournamentSchema.methods.addPlayer = async function() {
  if (this.isFull()) {
    throw new Error('Tournament is full');
  }
  this.currentPlayers += 1;
  await this.save();
};

// Method to decrement current players
TournamentSchema.methods.removePlayer = async function() {
  if (this.currentPlayers > 0) {
    this.currentPlayers -= 1;
    await this.save();
  }
};

module.exports = mongoose.model('Tournament', TournamentSchema);