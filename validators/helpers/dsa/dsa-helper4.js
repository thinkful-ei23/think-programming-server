'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateDSA4: function(answer) {
    let newAnswer = answer.replace(/\s/g, '');
    let newAnswer2 = newAnswer.replace(/[- )(]/g,'');

    if (newAnswer2 === 'On') {
      return true;
    } else {
      throw(`${answer} is not the correct time complexity`); 
    }
  }
};