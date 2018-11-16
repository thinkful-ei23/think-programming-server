'use strict';
const updateUserStats = require('./updateUserStats');

// function to validate answer has open and closing curly brackets
const findCurlyBrackets = function(string) {
  if (string.includes('{') && string.includes('}')) {
    return true;
  }
};

const isValidFunction = function(jsString) {
  let hasFunction = jsString.match(/(function)/g);
  let hasParenthesis = jsString.match(/[(\[][^\)\]]*?[)\]]/g);
  let hasCurlyBraces = findCurlyBrackets(jsString);
  return hasFunction === null || hasParenthesis === null || hasCurlyBraces === false;
};

const isValidHTML = function(htmlString) {
  let htmlElementTest = htmlString.match(/(?:<[^>]*>)/g);
  return htmlElementTest === null;
};

const validateUserAnswer = function(validator, evaluator, answerString, res, userId, type, next){
  try {
    validator(evaluator, answerString, res, userId, next);
  }
  catch (e) {
    updateUserStats(userId, 25, 'incorrect', type)
      .then(() => {
        res.json({error: true, message: 'Answer is incorrect'});
      });
  }
};

const validateUserAnswer2 = function(validator, evaluator, answerString, input, output, res, userId, type, next, str3){
  try {
    validator(evaluator, answerString, input, output, res, userId, next, str3);
  }
  catch (e) {
    updateUserStats(userId, 25, 'incorrect', type)
      .then(() => {
        res.json({error: true, message: 'Answer is incorrect'});
      });
  }
};

module.exports = { findCurlyBrackets, isValidFunction, isValidHTML, validateUserAnswer, validateUserAnswer2 };