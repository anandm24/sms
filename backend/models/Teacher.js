const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
