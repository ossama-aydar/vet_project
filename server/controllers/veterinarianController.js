const Veterinarian = require('../models/Veterinarian');
const Visit = require('../models/Visit');

exports.getVeterinarians = async (req, res) => {
  try {
    const vets = await Veterinarian.find();
    res.json(vets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVeterinarian = async (req, res) => {
  try {
    const vet = await Veterinarian.findById(req.params.id);
    if (!vet) return res.status(404).json({ error: 'Veterinarian not found' });
    res.json(vet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateVeterinarian = async (req, res) => {
  try {
    const vet = await Veterinarian.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vet) return res.status(404).json({ error: 'Veterinarian not found' });
    res.json(vet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createVeterinarian = async (req, res) => {
  try {
    const vet = new Veterinarian(req.body);
    await vet.save();
    res.status(201).json(vet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteVeterinarian = async (req, res) => {
  try {
    const vet = await Veterinarian.findByIdAndDelete(req.params.id);
    if (!vet) return res.status(404).json({ error: 'Veterinarian not found' });
    // Set veterinarian field to null in all visits referencing this vet
    await Visit.updateMany({ veterinarian: req.params.id }, { $set: { veterinarian: null } });
    res.json({ message: 'Veterinarian deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};