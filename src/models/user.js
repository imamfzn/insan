const mongoose = require('mongoose');

const User = new mongoose.Schema({
  auth_id: {
    alias: 'authId',
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
},
{ timestamps: true });

module.exports = mongoose.model('User', User);
