'use strict';
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/think-programming',
  TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/think-programming-test',
  CLIENT_ORIGIN: process.env.NODE_ENV || 'http://localhost:3000',
};