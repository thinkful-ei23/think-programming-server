'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateElement: function(answer) {
    if (answer === 'background-color') {
      return true;
    } else {
      throw(`${answer} is not the correct property to change the background color`); 
    }
  }
}