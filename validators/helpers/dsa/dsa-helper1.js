'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateElement: function(answer) {
    let newAnswer = answer.replace(/\s/g, '');

    if (newAnswer === 'O(1)') {
      return true;
    } else {
      throw(`${answer} is not the correct time complexity`); 
    }
  }
}