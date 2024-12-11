const Registration = require('../models/Registration');

const registrationController = {
  // Get all registrations (admin)
  async getAllRegistrations(req, res) {
    try {
      const registrations = await Registration.find()
        .populate('tournamentId')
        .sort('-createdAt');
        
      res.json({
        success: true,
        data: registrations
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get registrations by tournament
  async getByTournament(req, res) {
    try {
      const registrations = await Registration.find({
        tournamentId: req.params.tournamentId
      }).populate('tournamentId');
      
      res.json({
        success: true,
        data: registrations
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update registration status
  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const registration = await Registration.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!registration) {
        return res.status(404).json({
          success: false,
          message: 'Registration not found'
        });
      }

      res.json({
        success: true,
        data: registration
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = registrationController;