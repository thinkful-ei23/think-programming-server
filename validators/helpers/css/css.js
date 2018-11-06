'use strict';
const expect = require('../../expect');

module.exports = {
  evaluateCSSClass: function(answer, _class) {
    try{
      expect(answer).to.be.class(_class);
    }catch(e){
      throw(`${answer} doesn't contain the expected class`);
    }
  },
  evaluateCSSProperty: function(answer, _property, _value){
    const cleanAnswer = answer.replace(/\s/gm, '');
    const expected = `${_property}:${_value};`;
    try{
      expect(cleanAnswer).to.match(expected);
    }catch(e){
      throw(`${answer} doesn't contain the expected property "${_property}" or has a wrong syntax`);
    }
  }
};