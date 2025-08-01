const { ensureDefaultAdmin } = require('./init'); // ✅ import first
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/students', studentRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    ensureDefaultAdmin(); // ✅ Ensure admin is created after DB is connected
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Dummy Data schema
const dataSchema = new mongoose.Schema({
  one: String,
  two: String
});
const Data = mongoose.model('Data', dataSchema);

app.post('/data', async (req, res) => {
  try {
    const entry = new Data(req.body);
    await entry.save();
    console.log('✅ Saved entry:', entry);
    res.status(201).send(entry);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get('/data', async (req, res) => {
  try {
    const entries = await Data.find();
    res.send(entries);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
});

// Serve login.html as the homepage
const path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
