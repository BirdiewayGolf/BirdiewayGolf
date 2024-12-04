// backend/src/controllers/tournamentController.js
const Tournament = require('../models/Tournament');
const Registration = require('../models/Registration');

// Create Tournament
exports.createTournament = async (req, res) => {
  try {
    console.log('Create tournament request received');
    console.log('User from request:', req.user);
    console.log('Request body:', req.body);

    // Create tournament data keeping all fields exactly as received
    const tournamentData = {
      ...req.body,
      createdBy: req.user._id,
      // Just convert the specific fields that need type conversion
      entryFee: parseFloat(req.body.entryFee),
      maxPlayers: parseInt(req.body.maxPlayers),
      date: new Date(req.body.date),
      registrationDeadline: new Date(req.body.registrationDeadline)
    };

    console.log('Processed tournament data:', tournamentData);

    // Create and save tournament
    const tournament = new Tournament(tournamentData);
    const savedTournament = await tournament.save();

    console.log('Tournament created successfully:', savedTournament);
    res.status(201).json({
      message: `Tournament successfully created for ${tournamentData.league} league`,
      tournament: savedTournament
    });
  } catch (error) {
    console.error('Create tournament error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {})
      });
    }
    
    res.status(500).json({
      message: 'Error creating tournament',
      error: error.message
    });
  }
};

// Get All Tournaments
exports.getTournaments = async (req, res) => {
  try {
    console.log('Fetching tournaments request received');
    console.log('Query parameters:', req.query);

    const { league } = req.query;
    const query = league ? { league } : {};

    const tournaments = await Tournament.find(query)
      .sort({ date: 1 })
      .select('name date location maxPlayers league status entryFee format');

    console.log(`Found ${tournaments.length} tournaments`);
    res.json(tournaments);
  } catch (error) {
    console.error('Fetch tournaments error:', error);
    res.status(500).json({ 
      message: 'Error fetching tournaments',
      error: error.message 
    });
  }
};

// Get Single Tournament
exports.getTournament = async (req, res) => {
  try {
    console.log('Fetching single tournament request received');
    console.log('Tournament ID:', req.params.id);

    const tournament = await Tournament.findById(req.params.id);
    
    if (!tournament) {
      console.log('Tournament not found');
      return res.status(404).json({ message: 'Tournament not found' });
    }

    console.log('Tournament found:', tournament);
    res.json(tournament);
  } catch (error) {
    console.error('Fetch tournament error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid tournament ID format' });
    }
    
    res.status(500).json({
      message: 'Error fetching tournament',
      error: error.message 
    });
  }
};

// Update Tournament
exports.updateTournament = async (req, res) => {
  try {
    console.log('Update tournament request received');
    console.log('Tournament ID:', req.params.id);
    console.log('Update data:', req.body);

    const updateData = {
      ...req.body,
      entryFee: parseFloat(req.body.entryFee),
      maxPlayers: parseInt(req.body.maxPlayers),
      date: req.body.date ? new Date(req.body.date) : undefined,
      registrationDeadline: req.body.registrationDeadline ? new Date(req.body.registrationDeadline) : undefined
    };

    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!tournament) {
      console.log('Tournament not found for update');
      return res.status(404).json({ message: 'Tournament not found' });
    }

    console.log('Tournament updated successfully:', tournament);
    res.json({
      message: 'Tournament updated successfully',
      tournament
    });
  } catch (error) {
    console.error('Update tournament error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid tournament ID format' });
    }
    
    res.status(500).json({
      message: 'Error updating tournament',
      error: error.message
    });
  }
};

// Delete Tournament
exports.deleteTournament = async (req, res) => {
  try {
    console.log('Delete tournament request received');
    console.log('Tournament ID:', req.params.id);

    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    
    if (!tournament) {
      console.log('Tournament not found for deletion');
      return res.status(404).json({ message: 'Tournament not found' });
    }

    console.log('Tournament deleted successfully');
    res.json({
      message: 'Tournament deleted successfully',
      tournamentId: req.params.id
    });
  } catch (error) {
    console.error('Delete tournament error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid tournament ID format' });
    }
    
    res.status(500).json({
      message: 'Error deleting tournament',
      error: error.message
    });
  }
};

// Get Tournament Registrations
exports.getTournamentRegistrations = async (req, res) => {
  try {
    console.log('Fetching registrations for tournament:', req.params.id);

    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const registrations = await Registration.find({ 
      tournament: req.params.id 
    }).sort({ registrationDate: -1 });

    console.log(`Found ${registrations.length} registrations`);
    res.json(registrations);
  } catch (error) {
    console.error('Fetch registrations error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid tournament ID format' });
    }
    
    res.status(500).json({
      message: 'Error fetching registrations',
      error: error.message
    });
  }
};

module.exports = exports;