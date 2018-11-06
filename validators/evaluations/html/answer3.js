'use strict';
const {evaluateElement} = require('../../helpers/html/html-helper3');

module.exports = (htmlString, res) => {
  try{  
    console.log('TRY');
    evaluateElement(htmlString, 'a', 'Think Programming');
    res.json({error: false, message: 'Challenge completed'});
  }catch(e){
    console.log(e);
    res.json({error: true, message: e});
  }
};