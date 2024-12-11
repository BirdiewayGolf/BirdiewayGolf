const Tournament = require('../models/Tournament');
const Registration = require('../models/Registration');

const tournamentController = {
  // Create new tournament (admin only)
  async createTournament(req, res) {
    try {
      // Clean up empty strings and null values
      const cleanData = Object.entries(req.body).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            const cleanNested = Object.entries(value).reduce((nestedAcc, [nestedKey, nestedValue]) => {
              if (nestedValue !== '' && nestedValue !== null && nestedValue !== undefined) {
                nestedAcc[nestedKey] = nestedValue;
              }
              return nestedAcc;
            }, {});
            if (Object.keys(cleanNested).length > 0) {
              acc[key] = cleanNested;
            }
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

      const tournament = new Tournament(cleanData);
      await tournament.save();
      res.status(201).json({
        success: true,
        data: tournament,
        message: 'Tournament created successfully'
      });
    } catch (error) {
      console.error('Tournament creation error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Error creating tournament'
      });
    }
  },

  // Get all tournaments (admin)
  async getAllTournaments(req, res) {
    try {
      const tournaments = await Tournament.find()
        .sort({ date: 1 })
        .select('-__v');
      
      res.json({
        success: true,
        data: tournaments
      });
    } catch (error) {
      console.error('Get all tournaments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving tournaments'
      });
    }
  },

  // Get public tournaments (filtered by league if specified)
  async getPublicTournaments(req, res) {
    try {
      const { league } = req.params;
      let query = {};
      
      // If league is specified, add it to the query
      if (league && league !== 'all') {
        query.league = league.toLowerCase();
      }

      // Only show upcoming and ongoing tournaments
      query.status = { $in: ['upcoming', 'ongoing'] };

      const tournaments = await Tournament.find(query)
        .sort({ date: 1 })
        .select('-__v');

      res.json({
        success: true,
        data: tournaments
      });
    } catch (error) {
      console.error('Get public tournaments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving tournaments'
      });
    }
  },

  // Get single tournament details (public)
  async getTournamentDetails(req, res) {
    try {
      const tournament = await Tournament.findById(req.params.id)
        .select('-__v');

      if (!tournament) {
        return res.status(404).json({
          success: false,
          message: 'Tournament not found'
        });
      }

      res.json({
        success: true,
        data: tournament
      });
    } catch (error) {
      console.error('Get tournament details error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving tournament details'
      });
    }
  },

  // Get single tournament (admin)
  async getTournament(req, res) {
    try {
      const tournament = await Tournament.findById(req.params.id)
        .select('-__v');

      if (!tournament) {
        return res.status(404).json({
          success: false,
          message: 'Tournament not found'
        });
      }

      res.json({
        success: true,
        data: tournament
      });
    } catch (error) {
      console.error('Get tournament error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving tournament'
      });
    }
  },

  // Update tournament (admin only)
  async updateTournament(req, res) {
    try {
      // Clean up empty strings and null values
      const cleanData = Object.entries(req.body).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            const cleanNested = Object.entries(value).reduce((nestedAcc, [nestedKey, nestedValue]) => {
              if (nestedValue !== '' && nestedValue !== null && nestedValue !== undefined) {
                nestedAcc[nestedKey] = nestedValue;
              }
              return nestedAcc;
            }, {});
            if (Object.keys(cleanNested).length > 0) {
              acc[key] = cleanNested;
            }
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

      const tournament = await Tournament.findByIdAndUpdate(
        req.params.id,
        cleanData,
        { 
          new: true, 
          runValidators: true
        }
      );

      if (!tournament) {
        return res.status(404).json({
          success: false,
          message: 'Tournament not found'
        });
      }

      res.json({
        success: true,
        data: tournament,
        message: 'Tournament updated successfully'
      });
    } catch (error) {
      console.error('Update tournament error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Error updating tournament'
      });
    }
  },

  // Delete tournament (admin only)
  async deleteTournament(req, res) {
    try {
      // Check for existing registrations
      const registrations = await Registration.find({ tournament: req.params.id });
      if (registrations.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete tournament with existing registrations'
        });
      }

      const tournament = await Tournament.findByIdAndDelete(req.params.id);
      if (!tournament) {
        return res.status(404).json({
          success: false,
          message: 'Tournament not found'
        });
      }

      res.json({
        success: true,
        message: 'Tournament deleted successfully'
      });
    } catch (error) {
      console.error('Delete tournament error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting tournament'
      });
    }
  },

  // Update tournament status (admin only)
  async updateTournamentStatus(req, res) {
    try {
      const { status } = req.body;
      const validStatuses = ['upcoming', 'ongoing', 'completed', 'cancelled'];
      
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value'
        });
      }

      const tournament = await Tournament.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!tournament) {
        return res.status(404).json({
          success: false,
          message: 'Tournament not found'
        });
      }

      res.json({
        success: true,
        data: tournament,
        message: 'Tournament status updated successfully'
      });
    } catch (error) {
      console.error('Update tournament status error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating tournament status'
      });
    }
  },

  // Get tournament registrations count (admin only)
  async getTournamentRegistrationsCount(req, res) {
    try {
      const count = await Registration.countDocuments({ 
        tournament: req.params.id,
        status: { $ne: 'cancelled' }
      });

      res.json({
        success: true,
        data: { count }
      });
    } catch (error) {
      console.error('Get registrations count error:', error);
      res.status(500).json({
        success: false,
        message: 'Error getting registrations count'
      });
    }
  },

  // Get tournaments by league
  async getTournamentsByLeague(req, res) {
    try {
      const { league } = req.params;
      const validLeagues = ['business', 'junior', 'longday', 'fundraiser'];

      if (!validLeagues.includes(league.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid league specified'
        });
      }

      const tournaments = await Tournament.find({ 
        league: league.toLowerCase(),
        status: 'upcoming'
      })
        .sort({ date: 1 })
        .select('-__v');

      res.json({
        success: true,
        data: tournaments
      });
    } catch (error) {
      console.error('Get tournaments by league error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving tournaments'
      });
    }
  }
};

module.exports = tournamentController;