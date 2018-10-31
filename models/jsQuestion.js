'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const jsQuestionSchema = new mongoose.Schema({
  title: { type: String }, // JavaScript, HTML, CSS, Algorithm, etc
  question: { type: String }, 
});

// Transform output during `res.json(data)`, `console.log(data)` etc.
jsQuestionSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;  
  }
});

module.exports = mongoose.model('JSQuestion', jsQuestionSchema);