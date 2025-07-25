require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const dataSchema = new mongoose.Schema({
  one: String,
  two: String
});

// The model name is 'Data', so Mongoose will use 'datas' collection by default
const Data = mongoose.model('Data', dataSchema);

app.post('/data', async (req, res) => {
  try {
    const entry = new Data(req.body);
    await entry.save();
    console.log('Saved entry:', entry);
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
