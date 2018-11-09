'use strict';

const expect = require('../../expect');
const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

module.exports = {
  evaluateFn: function(answer, input, output, res, userId, next) {
    const values = Object.values(input);
    
    const cleanAnswer = `"use strict";return(${answer})`;
    const fn = Function(cleanAnswer)();
    if ((fn(...values)) === undefined) {
      return 'incorrect';
    } else {
      expect(fn(...values)).to.eql(output);
    }
  }
};