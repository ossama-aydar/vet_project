const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  diagnosis: { type: String },
  treatment: { type: String },
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
  veterinarian: { type: mongoose.Schema.Types.ObjectId, ref: 'Veterinarian', required: false }
});

module.exports = mongoose.models.Visit || mongoose.model('Visit', VisitSchema);