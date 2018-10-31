'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const gameQuestionsSchema = new mongoose.Schema({
  jsQuestions: { type: Array }, 
  htmlQuestions: { type: Array },
  cssQuestions: { type: Array },
  dsaQuestions: { type: Array }
});

// Transform output during `res.json(data)`, `console.log(data)` etc.
gameQuestionsSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;  
  }
});

module.exports = mongoose.model('GameQuestions', gameQuestionsSchema);