const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const Registration = require('../models/Registration');
const { validateRegistration } = require('../utils/validation');
const { sendRegistrationEmail, sendContactEmail } = require('../utils/email');

// Get public tournaments
router.get('/tournaments', async (req, res) => {
  try {
    const { league } = req.query;
    const query = league ? { league } : {};
    const tournaments = await Tournament.find({
      ...query,
      date: { $gt: new Date() }
    }).sort({ date: 1 });
    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).json({ message: 'Error fetching tournaments' });
  }
});

// Get single tournament
router.get('/tournaments/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    // Get registration count
    const registrationCount = await Registration.countDocuments({
      tournament: req.params.id,
      status: 'confirmed'
    });

    // Add registration count and spots remaining to tournament data
    const tournamentData = tournament.toObject();
    tournamentData.registeredPlayers = registrationCount;
    tournamentData.spotsRemaining = tournament.maxPlayers - registrationCount;

    res.json(tournamentData);
  } catch (error) {
    console.error('Error fetching tournament:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid tournament ID format' });
    }
    res.status(500).json({ message: 'Error fetching tournament' });
  }
});

// Register for a tournament
router.post('/tournaments/:id/register', validateRegistration, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    // Check if tournament is full
    const registrationCount = await Registration.countDocuments({
      tournament: tournament._id,
      status: 'confirmed'
    });

    if (registrationCount >= tournament.maxPlayers) {
      return res.status(400).json({ message: 'Tournament is full' });
    }

    const registration = new Registration({
      tournament: tournament._id,
      ...req.body,
    });

    await registration.save();
    console.log('Registration saved:', registration);
    await sendRegistrationEmail(registration);

    res.status(201).json({ 
      message: 'Registration successful', 
      registration 
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ message: 'Error creating registration' });
  }
});

// Contact Form Submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Input validation
    if (!name || !email || !subject || !message) {
      console.error('Validation failed: Missing fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    console.log('Contact form submission received:', { name, email, subject });
    await sendContactEmail({ name, email, subject, message });

    res.status(200).json({
      message: 'Message sent successfully',
      success: true
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      error: 'Failed to send message',
      message: error.message
    });
  }
});

module.exports = router;