const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  visits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visit' }]
});

module.exports = mongoose.model('Animal', AnimalSchema); 