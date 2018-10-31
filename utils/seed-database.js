'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

// Import models
const User = require('../models/user');
const GameQuestions = require('../models/gameQuestions');
// Import seed data
const seedUsers = require('../db/seed/users');
const seedGameQuestions = require('../db/seed/gameQuestions');

mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      User.insertMany(seedUsers),
      User.createIndexes(),
      GameQuestions.insertMany(seedGameQuestions),
      GameQuestions.createIndexes()
    ]);
  })
  .then((results) => {
    console.log(`inserted ${results[0].length} users`, 'inserted all game questions');
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.log(err);
  });