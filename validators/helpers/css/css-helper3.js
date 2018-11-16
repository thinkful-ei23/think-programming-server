'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateCSS3: function(answer) {
    let newAnswer = answer.replace(/\s/g, '');

    if (newAnswer === 'font-size') {
      return true;
    } else {
      throw(`${answer} is not the correct property to change the background color`); 
    }
  }
}