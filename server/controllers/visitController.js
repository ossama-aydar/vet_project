const Visit = require('../models/Visit');
const Animal = require('../models/Animal');

exports.createVisit = async (req, res) => {
  try {
    const visit = new Visit(req.body);
    await visit.save();
    // Add visit to animal's visits array
    await Animal.findByIdAndUpdate(visit.animalId, { $push: { visits: visit._id } });
    res.status(201).json(visit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    // Remove visit from animal's visits array
    await Animal.findByIdAndUpdate(visit.animalId, { $pull: { visits: visit._id } });
    res.json({ message: 'Visit deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    res.json(visit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getVisit = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    res.json(visit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};