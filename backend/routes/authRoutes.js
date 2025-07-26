const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  res.json({ message: 'Login successful' });
});

// (Optional) Create admin manually
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashedPwd });

  try {
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    res.status(400).json({ message: 'Error creating admin' });
  }
});

module.exports = router;
