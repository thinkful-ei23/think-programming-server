'use strict';
const {evaluateElement} = require('../../helpers/html');

module.exports = (htmlString, res) => {
  try{  
    evaluateElement(htmlString, 'script', 'src="jquery-3.3.1.min.js"');
    res.json({error: false, message: 'Challenge completed'});
  }catch(e){
    res.json({error: true, message: e});
  }
};
