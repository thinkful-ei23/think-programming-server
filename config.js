'use strict';
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb://ThinkProgramming:ZrFwTZ86vnBs0PNY458S@ds147003.mlab.com:47003/think-programming',
  TEST_MONGODB_URI:
    process.env.TEST_MONGODB_URI ||
    'mongodb://localhost/think-programming-test',
  CLIENT_ORIGIN: process.env.NODE_ENV || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
