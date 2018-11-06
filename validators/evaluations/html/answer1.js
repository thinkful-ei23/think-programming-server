'use strict';
const {evaluateElement} = require('../../helpers/html');

module.exports = (htmlString, res) => {
  try {  
    console.log('TRY');
    evaluateElement(htmlString, 'h1', 'My first HTML title');
    evaluateElement(htmlString, 'p', 'Learning is fun!');
    res.json({error: false, message: 'Challenge completed'});
  } catch(e) {
    console.log(e);
    res.json({error: true, message: e});
  }
};
