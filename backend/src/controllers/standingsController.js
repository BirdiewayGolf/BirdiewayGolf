const { Standing } = require('../models');

const standingsController = {
  // Get public league standings
  getLeagueStandings: async (req, res) => {
    try {
      const { league, season } = req.params;
      if (!league || !season) {
        return res.status(400).json({
          success: false,
          message: 'League and season are required'
        });
      }
      
      const standings = await Standing.find({
        league: league.toLowerCase(),
        season: season.toString()
      })
      .sort({ totalPoints: -1 }) // Sort by points descending
      .select('-__v');

      res.json({
        success: true,
        data: standings || []
      });
    } catch (error) {
      console.error('Error fetching league standings:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching league standings'
      });
    }
  },

  // Get admin league standings
  getAdminLeagueStandings: async (req, res) => {
    try {
      const { league, season } = req.params;
      if (!league || !season) {
        return res.status(400).json({
          success: false,
          message: 'League and season are required'
        });
      }

      const standings = await Standing.find({
        league: league.toLowerCase(),
        season: season.toString()
      })
      .sort({ totalPoints: -1 }) // Sort by points descending
      .select('playerName totalPoints averageScore position league');

      res.json({
        success: true,
        data: standings || []
      });
    } catch (error) {
      console.error('Error fetching admin league standings:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching admin league standings'
      });
    }
  },

  // Update league standings (admin only)
  updateLeagueStandings: async (req, res) => {
    try {
      const { league, season } = req.params;
      const { standings } = req.body;

      if (!league || !season || !Array.isArray(standings)) {
        return res.status(400).json({
          success: false,
          message: 'League, season, and standings array are required'
        });
      }

      // Delete existing standings for this league and season only
      await Standing.deleteMany({
        league: league.toLowerCase(),
        season: season.toString()
      });

      // Format and sort standings by total points
      const sortedStandings = standings
        .map(standing => ({
          playerName: standing.playerName,
          league: league.toLowerCase(),
          season: season.toString(),
          totalPoints: Number(standing.totalPoints) || 0,
          averageScore: Number(standing.averageScore) || 0,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((standing, index) => ({
          ...standing,
          position: index + 1
        }));

      // Create new standings
      const updatedStandings = await Standing.insertMany(sortedStandings);

      res.json({
        success: true,
        message: 'Standings updated successfully',
        data: updatedStandings
      });
    } catch (error) {
      console.error('Error updating league standings:', error);
      res.status(500).json({
        success: false,
        message: error.code === 11000 ? 'Duplicate player name in standings' : 'Error updating league standings'
      });
    }
  }
};

module.exports = standingsController;