'use strict';
const {evaluateFn} = require('../../helpers/javascript');

module.exports = (jsString, res) => {
  try{  
    evaluateElement(htmlString, 'h1', 'This is a title');
    evaluateElement(htmlString, 'p', 'This is my paragraph');
    res.json({error: false, message: 'Challenge completed'});
  }catch(e){
    console.log(e);
    res.json({error: true, message: e});
  }
};