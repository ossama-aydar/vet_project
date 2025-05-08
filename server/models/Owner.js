const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }]
});

module.exports = mongoose.models.Owner || mongoose.model('Owner', OwnerSchema); 