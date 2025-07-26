const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/", async (req, res) => {
  const { name, class: className } = req.body;
  try {
    const newStudent = new Student({ name, class: className });
    await newStudent.save();
    res.status(201).json({ message: "Student registered", student: newStudent });
  } catch (err) {
    res.status(400).json({ message: "Error registering student" });
  }
});

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

module.exports = router;
