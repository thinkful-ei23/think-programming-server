'use strict';
const express = require('express');
const mongoose = require('mongoose');
const GameQuestions = require('../models/gameQuestions');
const UserStats = require('../models/userStats');

// Import JavaScript Validation function
const jsAnswer = require('../validators/evaluations/javascript/answer');
const { evaluateFn } = require('../validators/helpers/javascript/javascript-helper1');

// Import HTML Validation and helper functions
const htmlAnswer = require('../validators/evaluations/html/answer');
const { evaluateElement1 } = require('../validators/helpers/html/html-helper1');
const { evaluateElement2 } = require('../validators/helpers/html/html-helper2');
const { evaluateElement3 } = require('../validators/helpers/html/html-helper3');
const { evaluateElement4 } = require('../validators/helpers/html/html-helper4');
const { evaluateElement5 } = require('../validators/helpers/html/html-helper5');

// Import CSS Validation and helper functions
const cssAnswer = require('../validators/evaluations/css/answer');
const { evaluateCSS1 } = require('../validators/helpers/css/css-helper1');
const { evaluateCSS2 } = require('../validators/helpers/css/css-helper2');
const { evaluateCSS3 } = require('../validators/helpers/css/css-helper3');
const { evaluateCSS4 } = require('../validators/helpers/css/css-helper4');
const { evaluateCSS5 } = require('../validators/helpers/css/css-helper5');

// Import dsa Validation and helper functions
const dsaAnswer = require('../validators/evaluations/dsa/answer');
const { evaluateDSA1 } = require('../validators/helpers/dsa/dsa-helper1');
const { evaluateDSA2 } = require('../validators/helpers/dsa/dsa-helper2');
const { evaluateDSA3 } = require('../validators/helpers/dsa/dsa-helper3');
const { evaluateDSA4 } = require('../validators/helpers/dsa/dsa-helper4');
const { evaluateDSA5 } = require('../validators/helpers/dsa/dsa-helper5');

const { isValidFunction, isValidHTML, validateUserAnswer, validateUserAnswer2 } = require('../utils/validations');

const updateUserStats = require('../utils/updateUserStats');
const updateUserStatsAfterReview = require('../utils/updateUserStatsAfterReview');

const router = express.Router();

/*======GET Endpoint for quiz questions=====*/
router.get('/questions',(req,res,next)=>{
  
  let { question, num } = req.query;
  if (!num) {
    const err = new Error('missing `question number` in request');
    err.status = 400;
    return next(err);
  }
  num = Number(num);
  if (!question) {
    const err = new Error('missing `questionType` in request');
    err.status = 400;
    return next(err);
  }
  // Validate question type exists
  if (['jsQuestions', 'htmlQuestions', 'cssQuestions', 'dsaQuestions'].indexOf(question) === -1) {
    const err = new Error('bad request: `question type` requested does not exist');
    err.status = 400;
    return next(err);
  }
  GameQuestions.findOne()
    .then(result => {
      result[`${question}`][num].total = result[`${question}`].length;
      res.json(result[`${question}`][num]);
    })
    .catch(err => {
      console.log(err);
      if (err.reason === 'Error GET /gameroom/questions') {
        return res.status(err.code).json(err);
      }
      next(err);
    });
});

/*======POST /answers Endpoint JavaScript Answers=====*/
router.post('/answers/jsQuestions/:num',(req,res,next)=>{
  const userId = req.user._id;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  let { num } = req.params;
  num -= 0;
  const jsString = req.body.answer;
  
  if (num === null || num === undefined) {
    const err = new Error('missing `number` in request');
    err.status = 400;
    return next(err);
  }
  if (!jsString) {
    const err = new Error('missing `answer` in request');
    err.status = 400;
    return next(err);
  }
  // Below handles if users answer does not pass basic validation.  we subtract points and send back error
  if (isValidFunction(jsString)) {
    updateUserStats(userId, 25, 'incorrect', 'javascript')
      .then(result => {
        res.json({error: true, message: 'Answer not a valid function'});
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  } else {
    // Answer passed basic validation, and now we will run it through our test
    
    // Create reusable Promise for incorrect answers
    // Based on question number we run try and catch to validate users answer.
    switch(num){
    case 0:
      validateUserAnswer2(jsAnswer, evaluateFn, jsString, {a: 1, b: 2}, 1, res, userId, 'javascript', next);
      break;
    case 1:
      validateUserAnswer2(jsAnswer, evaluateFn, jsString, {num1: 3, num2: 7}, 21, res, userId, 'javascript', next);
      break;
    case 2:
      validateUserAnswer2(jsAnswer, evaluateFn, jsString, { array: [1,2,3,4]}, 4, res, userId, 'javascript', next);
      break;
    case 3:
      validateUserAnswer2(jsAnswer, evaluateFn, jsString, { arr1: [4,5,8,9] }, 9, res, userId, 'javascript', next);
      break;
    case 4:
      validateUserAnswer2(jsAnswer, evaluateFn, jsString, {str: 'asdf;lkjasdf;lkjasdfa', letter: 'a'}, 4, res, userId, 'javascript', next);
      break;
    default:
      var err = new Error('question number does not exist');
      err.location = 'POST api/gameRoom/answers/jsQuestions/:num';
      err.status = 400;
      return next(err);
    }
  }
});
  

/*======POST /answers Endpoint html Answers=====*/
router.post('/answers/htmlQuestions/:num',(req,res,next)=>{
  const userId = req.user._id;
  let { num } = req.params;
  num -= 0;
  const htmlString = req.body.answer;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  if (num === null || num === undefined || isNaN(num)) {
    const err = new Error('missing `number` in request');
    err.location = 'POST api/gameRoom/answers/htmlQuestions/:num';
    err.status = 400;
    return next(err);
  }
  if (!htmlString) {
    const err = new Error('missing `answer` in request');
    err.location = 'POST api/gameRoom/answers/htmlQuestions/:num';
    err.status = 400;
    return next(err);
  }

  // Below handles if users answer does not pass basic validation.  we subtract points and send back error
  if (isValidHTML(htmlString)) {
    updateUserStats(userId, 25, 'incorrect', 'html')
      .then(result => {
        res.json({error: true, message: 'Answer not a valid html'});
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  } else {
    // Answer passed basic validation, and now we will run it through our test
    // Based on question number we run try and catch to validate users answer.
    switch(num){
    case 0:
      validateUserAnswer2(htmlAnswer, evaluateElement1, htmlString, 'h1', 'My first HTML title', res, userId, 'html', next);
      break;
    case 1:
      validateUserAnswer2(htmlAnswer, evaluateElement2, htmlString, 'script', 'src="jquery-3.3.1.min.js"', res, userId, 'html', next);
      break;
    case 2:
      validateUserAnswer2(htmlAnswer, evaluateElement3, htmlString, 'a', 'Think Programming', res, userId, 'html', next);
      break;
    case 3:
      validateUserAnswer2(htmlAnswer, evaluateElement4, htmlString, 'h2', 'Think Programming', res, userId, 'html', next);
      break;
    case 4:
      validateUserAnswer2(htmlAnswer, evaluateElement5, htmlString, 'ul', 'Think Programming', res, userId, 'html', next);
      break;
    default:
      var err = new Error('question number does not exist');
      err.location = 'POST api/gameRoom/answers/htmlQuestions/:num';
      err.status = 400;
      return next(err);
    }
  }
});

/*======POST /answers Endpoint CSS Answers=====*/
router.post('/answers/cssQuestions/:num', (req,res,next) => {
  const userId = req.user._id;
  let { num } = req.params;
  num -= 0;
  
  // If user sends bad answer we don't want to create error.  we want to record the bad answer and let the other user judge.  but either way both users will not be able to go to the next question.
  const cssString = req.body.answer;

  // Basic Validation
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  if (num === null || num === undefined || isNaN(num)) {
    const err = new Error('missing `number` in request');
    err.location = 'POST api/gameRoom/answers/cssQuestions/:num';
    err.status = 400;
    return next(err);
  }
  if (!cssString || cssString === null) {
    const err = new Error('missing `answer` in request');
    err.location = 'POST api/gameRoom/answers/cssQuestions/:num';
    err.status = 400;
    return next(err);
  }
  switch(num) {
  case 0:
    validateUserAnswer(cssAnswer, evaluateCSS1, cssString, res, userId, 'css', next);
    break;
  case 1:
    validateUserAnswer(cssAnswer, evaluateCSS2, cssString, res, userId, 'css', next);
    break;
  case 2:
    validateUserAnswer(cssAnswer, evaluateCSS3, cssString, res, userId, 'css', next);
    break;
  case 3:
    validateUserAnswer(cssAnswer, evaluateCSS4, cssString, res, userId, 'css', next);
    break;
  case 4:
    validateUserAnswer(cssAnswer, evaluateCSS5, cssString, res, userId, 'css', next);
    break;
  default:
    var err = new Error('question number does not exist');
    err.location = 'POST api/gameRoom/answers/cssQuestions/:num';
    err.status = 400;
    return next(err);
  }
});
  

/*======POST /answers Endpoint dsa Answers=====*/
router.post('/answers/dsaQuestions/:num', (req,res,next) => {
  const userId = req.user._id;
  let { num } = req.params;
  num -= 0;
  
  // If user sends bad answer we don't want to create error.  we want to record the bad answer and let the other user judge.  but either way both users will not be able to go to the next question.
  const dsaString = req.body.answer;
  // Basic Validation
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  if (num === null || num === undefined || isNaN(num)) {
    const err = new Error('missing `number` in request');
    err.location = 'POST api/gameRoom/answers/dsaQuestions/:num';
    err.status = 400;
    return next(err);
  }
  if (!dsaString || dsaString === null) {
    const err = new Error('missing `answer` in request');
    err.location = 'POST api/gameRoom/answers/dsaQuestions/:num';
    err.status = 400;
    return next(err);
  }
  switch(num) {
  case 0:
    validateUserAnswer(dsaAnswer, evaluateDSA1, dsaString, res, userId, 'dsa', next);
    break;
  case 1:
    validateUserAnswer(dsaAnswer, evaluateDSA2, dsaString, res, userId, 'dsa', next);
    break;
  case 2:
    validateUserAnswer(dsaAnswer, evaluateDSA3, dsaString, res, userId, 'dsa', next);
    break;
  case 3:
    validateUserAnswer(dsaAnswer, evaluateDSA4, dsaString, res, userId, 'dsa', next);
    break;
  case 4:
    validateUserAnswer(dsaAnswer, evaluateDSA5, dsaString, res, userId, 'dsa', next);
    break;
  default:
    var err = new Error('question number does not exist');
    err.location = 'POST api/gameRoom/answers/dsaQuestions/:num';
    err.status = 400;
    return next(err);
  }
});

/*======POST / Endpoint Approve/Deny judgement=====*/
router.post('/judgment/:room',(req,res,next)=>{
  const userId = req.user._id;
  let { room } = req.params;
  const verdict = req.body.answer;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  
  // Validate question type exists
  if (['jsQuestions', 'htmlQuestions', 'cssQuestions', 'dsaQuestions'].indexOf(room) === -1) {
    const err = new Error('bad request: `room` requested does not exist');
    err.status = 400;
    err.location = 'POST api/gameRoom/judgment/:room';
    return next(err);
  }

  // Increment/Decrement Total Points + RoomType points

  if (room === 'jsQuestions') {
    return updateUserStatsAfterReview(userId, 25, verdict, 'javascript')
      .then(() => {
        if (verdict === 'correct') {
          res.json({room: 'jsQuestions', verdict: 'correct', message: 'Your review was correct! +25 Total Points, +25 Javascript Points!'});
        } else {
          res.json({room: 'jsQuestions', verdict: 'incorrect', message: 'Your review was incorrect! -25 Total Points, -25 Javascript Points!'});
        }
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  } else if (room === 'htmlQuestions') {
    return updateUserStatsAfterReview(userId, 25, verdict, 'html')
      .then(() => {
        if (verdict === 'correct') {
          res.json({room: 'htmlQuestions', verdict: 'correct', message: 'Your review was correct! +25 Total Points, +25 HTML Points!'});
        } else {
          res.json({room: 'htmlQuestions', verdict: 'incorrect', message: 'Your review was incorrect! -25 Total Points, -25 HTML Points!'});
        }
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  } else if (room === 'cssQuestions') {
    return updateUserStatsAfterReview(userId, 25, verdict, 'css')
      .then(() => {
        if (verdict === 'correct') {
          res.json({room: 'cssQuestions', verdict: 'correct', message: 'Your review was correct! +25 Total Points, +25 CSS Points!'});
        } else {
          res.json({room: 'cssQuestions', verdict: 'incorrect', message: 'Your review was incorrect! -25 Total Points, -25 CSS Points!'});
        }
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  } else if (room === 'dsaQuestions') {
    return updateUserStatsAfterReview(userId, 25, verdict, 'dsa')
      .then(() => {
        if (verdict === 'correct') {
          res.json({room: 'dsaQuestions', verdict: 'correct', message: 'Your review was correct! +25 Total Points, +25 DSA Points!'});
        } else {
          res.json({room: 'dsaQuestions', verdict: 'incorrect', message: 'Your review was incorrect! -25 Total Points, -25 DSA Points!'});
        }
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  }
});

module.exports = router;