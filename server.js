// ✅ Load environment variables BEFORE anything else
require('dotenv').config(); 

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 10000;


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI) // Make sure the env variable is MONGODB_URI
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Schemas
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});
const User = mongoose.model('User', UserSchema);

const MemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  phone: String,
  certifications: String,
  gps: String,
  heartRate: String,
  temperature: String,
  motion: String,
  objectDetection: String,
  pressure: String,
  profileImage: String
});
const Member = mongoose.model('Member', MemberSchema);

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', ContactSchema);

// 🔐 Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ success: true, role: user.role });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ➕ Add Member Route
app.post('/add-member', async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.send("Member added successfully!");
  } catch (error) {
    console.error("Add member error:", error);
    res.status(500).send("Failed to add member");
  }
});

// 📋 Get All Members
app.get('/get-members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).send("Server error");
  }
});

// 👤 Get Member by ID
app.get('/member/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.json(member);
  } catch (error) {
    res.status(500).send("Error fetching member details");
  }
});

// 🧑‍💻 Get All Users
app.get('/get-users', async (req, res) => {
  try {
    const users = await User.find({}, { username: 1, role: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).send("Failed to fetch users");
  }
});

// 📩 Save Contact Form to DB
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.send("Message received and stored!");
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).send("Failed to save message.");
  }
});

// 📥 Get Messages (for admin)
app.get('/get-messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).send("Error fetching messages");
  }
});

// ✅ Health check endpoint (for Render)
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});
