'use strict';
const {evaluateFn} = require('../../helpers/javascript/javascript-helper1');

module.exports = (jsString, res) => {
  try{  
    evaluateFn(jsString,  );
    
    res.json({error: false, message: 'Challenge completed'});
  }catch(e){
    console.log(e);
    res.json({error: true, message: e});
  }
};