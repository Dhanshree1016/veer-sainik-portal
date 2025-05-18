// routes/contact.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact'); // if using separate model file

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

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
