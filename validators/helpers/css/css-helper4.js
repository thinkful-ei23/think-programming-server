'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateCSS4: function(answer) {
    let newAnswer = answer.replace(/\s/g, '');

    if (newAnswer === 'p{font-weight:bold;}') {
      return true;
    } else {
      throw(`${answer} is not the correct css syntax to change all the <p> bold`); 
    }
  }
}