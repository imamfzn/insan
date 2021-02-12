const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 25,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('User', User);
