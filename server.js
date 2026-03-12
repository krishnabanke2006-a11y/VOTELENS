require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const schemeRoutes = require('./routes/schemes');
const candidateRoutes = require('./routes/candidates');
const voteRoutes = require('./routes/votes');
const dashboardRoutes = require('./routes/dashboard');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('CivicConnect API is running...');
});

// Database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/civicconnect';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
