const Owner = require('../models/Owner');
const Animal = require('../models/Animal');

exports.getOwners = async (req, res) => {
  try {
    const { lastName } = req.query;
    let owners;
    if (lastName) {
      owners = await Owner.find({ lastName: { $regex: lastName, $options: 'i' } });
    } else {
      owners = await Owner.find();
    }
    res.json(owners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOwner = async (req, res) => {
  try {
    const owner = new Owner(req.body);
    await owner.save();
    res.status(201).json(owner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    res.json(owner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOwnerFull = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id)
      .populate({
        path: 'pets',
        populate: { path: 'visits' }
      });
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    res.json(owner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner) return res.status(404).json({ error: 'Owner not found' });
    res.json({ message: 'Owner deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 