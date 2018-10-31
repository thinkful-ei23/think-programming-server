'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const User = require('../models/user');
const JSQuestion = require('../models/jsQuestion');
const seedUsers = require('../db/seed/users');
const seedJSQuestions = require('../db/seed/jsQuestions');

mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      User.insertMany(seedUsers),
      User.createIndexes(),
      JSQuestion.insertMany(seedJSQuestions),
      JSQuestion.createIndexes()
    ]);
  })
  .then((results) => {
    console.log(`inserted ${results[0].length} users`, `inserted ${results[1].length} JavaScript Questions`);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.log(err);
  });