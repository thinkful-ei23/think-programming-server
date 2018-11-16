'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateCSS5: function(answer) {
    let newAnswer = answer.replace(/\s/g, '');

    if (newAnswer === 'static') {
      return true;
    } else {
      throw(`${answer} is not the default value of the position property`); 
    }
  }
}