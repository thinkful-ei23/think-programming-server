'use strict'
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user');

// ===== Define and create basicStrategy =====
const localStrategy = new LocalStrategy((username, password, callback) => {
  let user;
  User.findOne({ username })
    .then(results => {
      user = results;
      if (!user) {
        const err = new Error('Incorrect username');
        err.status = 400;
        err.location = 'username';
        err.message = 'Incorrect Username';
        return Promise.reject(err);
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        const err = new Error('Incorrect Password');
        err.status = 401;
        err.reason = 'LoginError',
        err.message = 'Incorrect Password';
        err.location = 'password'; 
        return Promise.reject(err);
      }
      return callback(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false);
      }
      return callback(err);
    });
});

module.exports = localStrategy;
