'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateElement: function(answer) {
    let newAnswer = answer.replace(/\s/g, '');

    if (newAnswer === 'background-color') {
      return true;
    } else {
      throw(`${answer} is not the correct property to change the background color`); 
    }
  }
}