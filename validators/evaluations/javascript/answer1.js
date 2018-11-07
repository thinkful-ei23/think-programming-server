'use strict';
const {evaluateFn} = require('../../helpers/javascript/javascript-helper1');

module.exports = (jsString, res) => {
  try {  
    evaluateFn(jsString, {a: 1, b: 2}, 1);
    res.json({error: false, message: 'Challenge completed'});
  } catch(e) {
    console.log(e);
    res.json({error: true, message: e});
  }
};