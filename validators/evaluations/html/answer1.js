'use strict';
const {evaluateElement} = require('../../helpers/html/html-helper1');

module.exports = (htmlString, res) => {
  try {  
    console.log('TRYING QUESTION 1');
    evaluateElement(htmlString, 'h1', 'My first HTML title');
    res.json({error: false, message: 'Challenge completed'});
  } catch(e) {
    console.log(e);
    res.json({error: true, message: e});
  }
};
