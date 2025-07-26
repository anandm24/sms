const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.post('/', async (req, res) => {
  try {
    const { teacher, date, status } = req.body;
    const newAttendance = new Attendance({ teacher, date, status });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const records = await Attendance.find().populate('teacher', 'name');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
