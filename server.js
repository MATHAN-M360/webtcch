const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mobilecases')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static HTML/JS

// Routes
const caseRoutes = require('./routes/cases');
app.use('/cases', caseRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:5000/mobilecaseadd.html`));
