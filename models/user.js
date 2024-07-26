const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  phoneNumber: String
});

module.exports = mongoose.model('User', userSchema , 'user');
