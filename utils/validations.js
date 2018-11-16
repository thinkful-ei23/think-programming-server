'use strict';

const { handleJavaScriptIncorrect } = require('../validators/validator-results/javascript/answer-incorrect');

// function to validate answer has open and closing curly brackets
const findCurlyBrackets = function(string) {
  if (string.includes('{') && string.includes('}')) {
    return true;
  }
};

const isValidFunction = function(jsString){
  let hasFunction = jsString.match(/(function)/g);
  let hasParenthesis = jsString.match(/[(\[][^\)\]]*?[)\]]/g);
  let hasCurlyBraces = findCurlyBrackets(jsString);
  return hasFunction === null || hasParenthesis === null || hasCurlyBraces === false;
};

const validateUserAnswer = function(jsAnswer, jsString, res, userId, next){
  try {
    jsAnswer(jsString, res, userId, next);
  }
  catch (e) {
    handleJavaScriptIncorrect(userId)
      .then(() => {
        res.json({error: true, message: 'Answer is incorrect'});
      });
  }
};

module.exports = {findCurlyBrackets, isValidFunction, validateUserAnswer};