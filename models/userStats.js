'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Transform output during `res.json(data)`, `console.log(data)` etc.
userStatsSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

module.exports = mongoose.model('User', userStatsSchema);