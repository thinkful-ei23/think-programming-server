'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const options = { session: false, failWithError: true };

const localAuth = passport.authenticate('local', options);
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});

function createAuthToken(user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', localAuth, (req, res, next) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

// @route   POST api/auth/refresh
// @desc    Refreshes token
// @access  Private
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;
