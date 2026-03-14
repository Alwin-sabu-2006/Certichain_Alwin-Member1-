const mongoose = require('mongoose');

// User / Organization Schema
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'org'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  website: { type: String, default: '' }, // Only orgs
  university: { type: String, default: '' } // Only users
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
