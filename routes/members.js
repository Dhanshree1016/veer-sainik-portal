const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: String,
    role: String,
    email: String,
    phone: String,
    certifications: String
});
const Member = mongoose.model('Member', MemberSchema);

// GET /members
router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        console.error("GET /members failed:", err);
        res.status(500).send("Error fetching members");
    }
});

module.exports = router;
