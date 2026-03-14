const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { User } = require('./models');

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to call the API

// Connect to local MongoDB instance
mongoose.connect('mongodb://localhost:27017/certichain').then(() => console.log('✅ Connected to MongoDB locally'))
  .catch(err => console.error('❌ Failed connecting to MongoDB', err));

/* ─── API ROUTES ─── */

// 1. Organization Signup
app.post('/api/org/signup', async (req, res) => {
  try {
    const { orgName, email, website, password } = req.body;
    
    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const newOrg = new User({ 
      role: 'org', 
      name: orgName, 
      email, 
      website, 
      password 
    });
    
    await newOrg.save();
    res.status(201).json({ message: 'Organization account created!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// 2. User Signup
app.post('/api/user/signup', async (req, res) => {
    try {
      const { fullName, email, university, password } = req.body;
      
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ error: 'Email already exists' });
  
      const newUser = new User({ 
        role: 'user', 
        name: fullName, 
        email, 
        university, 
        password 
      });
      
      await newUser.save();
      res.status(201).json({ message: 'User Account created!' });
    } catch (error) {
      res.status(500).json({ error: 'Server error: ' + error.message });
    }
});

// 3. Simple Login form for both
app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });
      
      if (user.password !== password) {
          return res.status(401).json({ error: 'Invalid password' });
      }
      
      // Return the role so the frontend knows where to redirect
      res.status(200).json({ message: 'Login successful', role: user.role, name: user.name });
    } catch (error) {
      res.status(500).json({ error: 'Server error: ' + error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 CertiChain API running on port ${PORT}`);
});
