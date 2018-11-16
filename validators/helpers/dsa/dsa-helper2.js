'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateDSA2: function(answer) {
    let newAnswer = answer.replace(/\s/g, '');

    if (newAnswer === 'O(n^2)') {
      return true;
    } else {
      throw(`${answer} is not the correct time complexity`); 
    }
  }
};