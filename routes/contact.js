const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema (or move this to models/contact.js if you prefer)
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// POST /contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).send("Message received and stored!");
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).send("Failed to save message.");
  }
});

module.exports = router;
