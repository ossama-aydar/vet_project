// Script to seed veterinarians into the database
require('dotenv').config();
const mongoose = require('mongoose');
const Veterinarian = require('./models/Veterinarian');

const vets = [
  { name: 'Dr. Alice Smith', specialty: 'Surgery', email: 'alice@vetclinic.com', phoneNumber: '123-456-7890' },
  { name: 'Dr. Bob Johnson', specialty: 'Dermatology', email: 'bob@vetclinic.com', phoneNumber: '234-567-8901' },
  { name: 'Dr. Carol Lee', specialty: 'Dentistry', email: 'carol@vetclinic.com', phoneNumber: '345-678-9012' }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Veterinarian.deleteMany({});
    await Veterinarian.insertMany(vets);
    console.log('Veterinarians seeded');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error seeding veterinarians:', err);
    mongoose.disconnect();
  });
