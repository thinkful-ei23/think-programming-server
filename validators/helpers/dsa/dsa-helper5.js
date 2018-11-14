'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateElement: function(answer) {
    let newAnswer = answer.replace(/\s/g, '');
    let newAnswer2 = newAnswer.replace(/[- )(]/g,'').toLowerCase();

    if (newAnswer2 === 'growthofthenumberofoperations') {
      return true;
    } else {
      throw(`${answer} is not the correct time complexity`); 
    }
  }
}