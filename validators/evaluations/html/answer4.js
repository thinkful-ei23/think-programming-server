'use strict';
const {evaluateElement} = require('../../helpers/html/html-helper4');

module.exports = (htmlString, res) => {
  try {  
    console.log('TRYING QUESTION 4');
    evaluateElement(htmlString, 'h2', 'Think Programming');
    res.json({error: false, message: 'Challenge completed'});
  } catch(e) {
    console.log(e);
    res.json({error: true, message: e});
  }
};