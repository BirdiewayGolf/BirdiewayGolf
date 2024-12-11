const Contact = require('../models/Contact');
const emailService = require('../utils/email');
const asyncHandler = require('express-async-handler');

const contactController = {
  // @desc Submit a new contact form and send emails
  // @route POST /api/contact
  // @access Public
  submitContact: asyncHandler(async (req, res) => {
    // Clean the request body by removing empty fields
    const contactData = {
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message
    };

    // Only add phone if it exists and isn't empty
    if (req.body.phone && req.body.phone.trim()) {
      contactData.phone = req.body.phone;
    }

    // Only add tournament data if it exists and is valid
    if (req.body.tournamentId && req.body.tournamentId !== '') {
      contactData.tournamentId = req.body.tournamentId;
      contactData.tournamentName = req.body.tournamentName;
    }

    // Create and save contact with cleaned data
    const contact = new Contact(contactData);
    await contact.save();

    try {
      // Send emails in parallel
      const [notificationSent, confirmationSent] = await Promise.all([
        emailService.sendContactNotification(contact),
        emailService.sendContactConfirmation(contact)
      ]);

      // Log email status
      console.log('Email status:', { notificationSent, confirmationSent });

      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        emailStatus: { notificationSent, confirmationSent }
      });
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Email sending error:', emailError);
      
      // Return success since contact was saved, but indicate email issues
      res.status(201).json({
        success: true,
        message: 'Message saved but there were issues sending confirmation emails',
        emailStatus: { error: emailError.message }
      });
    }
  }),

  // Rest of your controller methods remain the same...
  getContacts: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  }),

  updateContactStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      res.status(404);
      throw new Error('Contact submission not found');
    }

    res.json({
      success: true,
      data: contact
    });
  }),

  deleteContact: asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact submission not found');
    }

    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  }),

  getContact: asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact submission not found');
    }

    res.json({
      success: true,
      data: contact
    });
  })
};

module.exports = contactController;