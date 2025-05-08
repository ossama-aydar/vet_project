require('dotenv').config(); // Ensure dotenv is loaded at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const ownerRoutes = require('./routes/ownerRoutes');
const animalRoutes = require('./routes/animalRoutes');
const veterinarianRoutes = require('./routes/veterinarianRoutes');
const visitRoutes = require('./routes/visitRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/owners', ownerRoutes);
app.use('/animals', animalRoutes);
app.use('/veterinarians', veterinarianRoutes);
app.use('/visits', visitRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});