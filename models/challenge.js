'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String }, // JavaScript, HTML, CSS, Algorithm, etc
  question: { type: String }, 
  answer: { type: String }, // User/Challenger's posted answer
  comment: { 
    type: String,
    default: Date.now // Timestamp of the posted comment
  } // User/Challeger's comment on rejection
});

// Transform output during `res.json(data)`, `console.log(data)` etc.
userSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;  
  }
});

module.exports = mongoose.model('Challenge', challengeSchema);