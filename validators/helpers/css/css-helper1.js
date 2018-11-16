'use strict';

module.exports = {
  evaluateCSS1: function(answer) {
    // Remove all white space
    let newAnswer = answer.replace(/\s/g, '');

    if (newAnswer[0] === '/' && newAnswer[1] === '*' && newAnswer[newAnswer.length-1] === '/' && newAnswer[newAnswer.length-2] === '*') {
      return true;
    } else {
      throw(`${answer} doesn't contain the expected syntax`); 
    }
  }
};