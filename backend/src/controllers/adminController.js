const { Tournament, Registration, Standing, Contact } = require('../models');
const emailService = require('../utils/email');

const adminController = {
  // Get dashboard stats and overview
  async getDashboardStats(req, res) {
    try {
      const [
        totalTournaments,
        activeRegistrations,
        newMessages,
        upcomingTournaments,
        recentRegistrations,
        leagueStats
      ] = await Promise.all([
        Tournament.countDocuments(),
        Registration.countDocuments({ status: 'confirmed' }),
        Contact.countDocuments({ status: 'new' }),
        Tournament.find({ status: 'upcoming' })
          .sort('date')
          .limit(5),
        Registration.find()
          .sort('-createdAt')
          .limit(5)
          .populate('tournamentId'),
        Tournament.aggregate([
          {
            $group: {
              _id: '$league',
              count: { $sum: 1 },
              activeTournaments: {
                $sum: {
                  $cond: [{ $eq: ['$status', 'upcoming'] }, 1, 0]
                }
              }
            }
          }
        ])
      ]);

      res.json({
        success: true,
        data: {
          totalTournaments,
          activeRegistrations,
          newMessages,
          upcomingTournaments,
          recentRegistrations,
          leagueStats,
          lastUpdated: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get detailed tournament report
  async getTournamentReport(req, res) {
    try {
      const tournament = await Tournament.findById(req.params.id);
      if (!tournament) {
        return res.status(404).json({
          success: false,
          message: 'Tournament not found'
        });
      }

      const [registrations, standings] = await Promise.all([
        Registration.find({ 
          tournamentId: tournament._id,
          status: 'confirmed'
        }).sort('-createdAt'),
        Standing.find({ tournamentId: tournament._id })
          .sort('position')
      ]);

      const reportData = {
        tournament,
        registrations,
        standings,
        summary: {
          totalPlayers: registrations.length,
          remainingSpots: tournament.maxPlayers - registrations.length,
          revenue: registrations.length * tournament.price,
          completionStatus: tournament.status
        }
      };

      res.json({
        success: true,
        data: reportData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update tournament status
  async updateTournamentStatus(req, res) {
    try {
      const { status } = req.body;
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

      // If tournament is marked as completed, calculate final standings
      if (status === 'completed') {
        await Standing.updateMany(
          { tournamentId: tournament._id },
          { $set: { status: 'active' } }
        );

        // Notify players of final results
        const registrations = await Registration.find({
          tournamentId: tournament._id,
          status: 'confirmed'
        });

        for (const registration of registrations) {
          await emailService.sendTournamentComplete(registration.email, tournament);
        }
      }

      res.json({
        success: true,
        data: tournament
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Manage registrations
  async manageRegistration(req, res) {
    try {
      const { action } = req.body;
      const registration = await Registration.findById(req.params.id);

      if (!registration) {
        return res.status(404).json({
          success: false,
          message: 'Registration not found'
        });
      }

      if (action === 'confirm') {
        registration.status = 'confirmed';
        await emailService.sendRegistrationConfirmation(registration);
      } else if (action === 'cancel') {
        registration.status = 'cancelled';
        await emailService.sendRegistrationCancellation(registration);
      }

      await registration.save();

      const tournament = await Tournament.findById(registration.tournamentId);
      tournament.currentPlayers = action === 'confirm' 
        ? tournament.currentPlayers + 1 
        : tournament.currentPlayers - 1;
      await tournament.save();

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
  },

  // Get league standings summary
  async getLeagueStandings(req, res) {
    try {
      const { league, season } = req.query;
      
      const standings = await Standing.aggregate([
        {
          $match: { 
            league,
            season,
            status: 'active'
          }
        },
        {
          $group: {
            _id: '$playerName',
            totalPoints: { $sum: '$points' },
            tournamentsPlayed: { $sum: 1 },
            averageScore: { $avg: '$score' },
            bestPosition: { $min: '$position' }
          }
        },
        {
          $sort: { 
            totalPoints: -1,
            averageScore: 1
          }
        }
      ]);

      res.json({
        success: true,
        data: standings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Handle contact messages
  async handleContact(req, res) {
    try {
      const { action, response } = req.body;
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact message not found'
        });
      }

      contact.status = action;
      await contact.save();

      if (action === 'responded' && response) {
        await emailService.sendContactResponse(contact.email, response);
      }

      res.json({
        success: true,
        data: contact
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = adminController;