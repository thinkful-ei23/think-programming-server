'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateElement: function(answer) {
    // const $ = cheerio.load(answer);
    // expect($(element)).to.appear(1);
    // expect($(element).text()).to.eql(string);

    // Remove all white space
    let newAnswer = answer.replace(/\s/g, '');

    if (newAnswer[0] === '/' && newAnswer[1] === '*' && newAnswer[newAnswer.length-1] === '/' && newAnswer[newAnswer.length-2] === '*') {
      return true;
    } else {
      throw(`${answer} doesn't contain the expected syntax`); 
    }
  }
  // evaluateCSSClass: function(answer, _class) {
  //   try{
  //     expect(answer).to.be.class(_class);
  //   }catch(e){
  //     throw(`${answer} doesn't contain the expected class`);
  //   }
  // },
  // evaluateCSSProperty: function(answer, _property, _value){
  //   const cleanAnswer = answer.replace(/\s/gm, '');
  //   const expected = `${_property}:${_value};`;
  //   try{
  //     expect(cleanAnswer).to.match(expected);
  //   }catch(e){
  //     throw(`${answer} doesn't contain the expected property "${_property}" or has a wrong syntax`);
  //   }
  // }
};