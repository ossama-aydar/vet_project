const Animal = require('../models/Animal');
const Owner = require('../models/Owner');

exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    // Add animal to owner's pets array
    await Owner.findByIdAndUpdate(animal.ownerId, { $push: { pets: animal._id } });
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) return res.status(404).json({ error: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal not found' });
    // Remove animal from owner's pets array
    await Owner.findByIdAndUpdate(animal.ownerId, { $pull: { pets: animal._id } });
    res.json({ message: 'Animal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('visits');
    if (!animal) return res.status(404).json({ error: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};