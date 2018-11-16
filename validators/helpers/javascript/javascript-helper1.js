'use strict';

const expect = require('../../expect');

module.exports = {
  evaluateFn: function(answer, input, output) {
    console.log('I DONT GET HERE')
    const values = Object.values(input);
    const cleanAnswer = `"use strict";return(${answer})`;
    const fn = Function(cleanAnswer)();
    expect(fn(...values)).to.eql(output);
  }
};