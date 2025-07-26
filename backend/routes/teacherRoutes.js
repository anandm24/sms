const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Create a new teacher
router.post('/', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json({ message: 'Teacher added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update teacher
router.put('/:id', async (req, res) => {
  try {
    await Teacher.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Teacher updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete teacher
router.delete('/:id', async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
