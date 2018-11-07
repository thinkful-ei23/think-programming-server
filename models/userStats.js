'use strict';
const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId, ref:'User',required:true},
  username: { type: String, required: true },
  totalPoints: { type: Number, required: true, default: 0 },
  totalAnswered: { type: Number, required: true, default: 0 },
  totalCorrect: { type: Number, required: true, default: 0 },
  totalIncorrect: { type: Number, required: true, default: 0 },
  correctPercentage: { type: Number, required: true, default: 0 },
  javascriptTotalAnswered: { type: Number, required: true, default: 0 },
  javascriptTotalCorrect: { type: Number, required: true, default: 0 },
  javascriptTotalIncorrect: { type: Number, required: true, default: 0 },
  javascriptCorrectPercentage: { type: Number, required: true, default: 0 },
  javascriptTotalPoints: { type: Number, required: true, default: 0 },
  htmlTotalAnswered: { type: Number, required: true, default: 0 },
  htmlTotalCorrect: { type: Number, required: true, default: 0 },
  htmlTotalIncorrect: { type: Number, required: true, default: 0 },
  htmlCorrectPercentage: { type: Number, required: true, default: 0 },
  htmlTotalPoints: { type: Number, required: true, default: 0 },
  cssTotalAnswered: { type: Number, required: true, default: 0 },
  cssTotalCorrect: { type: Number, required: true, default: 0 },
  cssTotalIncorrect: { type: Number, required: true, default: 0 },
  cssCorrectPercentage: { type: Number, required: true, default: 0 },
  cssTotalPoints: { type: Number, required: true, default: 0 },
  dsaTotalAnswered: { type: Number, required: true, default: 0 },
  dsaTotalCorrect: { type: Number, required: true, default: 0 },
  dsaTotalIncorrect: { type: Number, required: true, default: 0 },
  dsaCorrectPercentage: { type: Number, required: true, default: 0 },
  dsaTotalPoints: { type: Number, required: true, default: 0 },
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

module.exports = mongoose.model('UserStatsSchema', userStatsSchema);