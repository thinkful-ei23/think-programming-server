'use strict';
const express = require('express');
const mongoose = require('mongoose');
const GameQuestions = require('../models/gameQuestions');
const UserStats = require('../models/userStats');

// Import JavaScript Validation function
const jsAnswer1 = require('../validators/evaluations/javascript/answer1');
const jsAnswer2 = require('../validators/evaluations/javascript/answer2');
const jsAnswer3 = require('../validators/evaluations/javascript/answer3');
const jsAnswer4 = require('../validators/evaluations/javascript/answer4');
const jsAnswer5 = require('../validators/evaluations/javascript/answer5');

// Import HTML Validation functions
const htmlAnswer1 = require('../validators/evaluations/html/answer1');
const htmlAnswer2 = require('../validators/evaluations/html/answer2');
const htmlAnswer3 = require('../validators/evaluations/html/answer3');
const htmlAnswer4 = require('../validators/evaluations/html/answer4');
const htmlAnswer5 = require('../validators/evaluations/html/answer5');

// Import CSS Validation functions
const cssAnswer1 = require('../validators/evaluations/css/answer1');
const cssAnswer2 = require('../validators/evaluations/css/answer2');
const cssAnswer3 = require('../validators/evaluations/css/answer3');
const cssAnswer4 = require('../validators/evaluations/css/answer4');
const cssAnswer5 = require('../validators/evaluations/css/answer5');

// Import handle incorrect answer functions
const { handleJavaScriptIncorrect } = require('../validators/validator-results/javascript/answer-incorrect');
const { handleHTMLIncorrect } = require('../validators/validator-results/html/answer-incorrect');
const { handleCSSIncorrect } = require('../validators/validator-results/css/answer-incorrect');

const router = express.Router();

/*======GET Endpoint for quiz questions=====*/
router.get('/questions',(req,res,next)=>{
  
  let { question, num } = req.query;
  num = Number(num);
  GameQuestions.findOne()
    .then(result => {
      res.json(result[`${question}`][num]);
    })
    .catch(err => {
      if (err.reason === 'Error GET /gameroom/questions') {
        return res.status(err.code).json(err);
      }
      next(err);
    });
});

/*======POST /answers Endpoint JavaScript Answers=====*/
router.post('/answers/jsQuestions/:num',(req,res,next)=>{
  const userId = req.user._id;
  let { num } = req.params;
  num = Number(num);
  const jsString = req.body.answer;
  
  // Validating answer has the word 'function' and at least two parenthesis
  let hasFunction = jsString.match(/(function)/g);
  let hasParenthesis = jsString.match(/[(\[][^\)\]]*?[)\]]/g);
  
  // function to validate answer has open and closing curly brackets
  function findCurlyBrackets(string) {
    if (string.includes('{') && string.includes('}')) {
      return true;
    }
  }
  let hasCurlyBraces = findCurlyBrackets(jsString);
  
  // Below handles if users answer does not pass basic validation.  we subtract points and send back error
  if (hasFunction === null || hasParenthesis === null || hasCurlyBraces === false) {
    
    UserStats.findOne({ userId }, function(err, userStats) {
      userStats.totalPoints = userStats.totalPoints -= 25;
      userStats.totalAnswered = userStats.totalAnswered += 1;
      userStats.totalIncorrect = userStats.totalIncorrect += 1;
      userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
      userStats.javascriptTotalPoints = userStats.javascriptTotalPoints -= 25;
      userStats.javascriptTotalAnswered = userStats.javascriptTotalAnswered += 1;
      userStats.javascriptTotalIncorrect += 1;
      userStats.javascriptCorrectPercentage = (userStats.javascriptTotalCorrect/userStats.javascriptTotalAnswered * 100).toFixed(2); 
      userStats.save(function(err) {
        if(err) {
          console.log('ERROR! Updating User Stats');
        }
      });
    })
      .then(result => {
        res.json({error: true, message: 'Answer not a valid function'});
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  } else {
    // Answer passed basic validation, and now we will run it through our test
    
    // Create reusable Promise for incorrect answers
    const handleIncorrectJavaScriptPromise = new Promise(function(resolve, reject) {
      resolve(handleJavaScriptIncorrect(userId));
    });

    // Based on question number we run try and catch to validate users answer.
    if (num === 0) {
      try {
        jsAnswer1(jsString, res, userId, next);
      }
      catch (e) {
        handleIncorrectJavaScriptPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      }
    } else if (num === 1) {
      try {
        jsAnswer2(jsString, res, userId, next);
      }
      catch (e) {
        handleIncorrectJavaScriptPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      }
    } else if (num === 2) {
      try {
        jsAnswer3(jsString, res, userId, next);
      }
      catch (e) {
        handleIncorrectJavaScriptPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      }
    } else if (num === 3) {
      try {
        jsAnswer4(jsString, res, userId, next);
      }
      catch (e) {
        handleIncorrectJavaScriptPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      }
    } else if (num === 4) {
      try {
        jsAnswer5(jsString, res, userId, next);
      }
      catch (e) {
        handleIncorrectJavaScriptPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      }
    }
  }
});

/*======POST /answers Endpoint html Answers=====*/
router.post('/answers/htmlQuestions/:num',(req,res,next)=>{
  const userId = req.user._id;
  let { num } = req.params;
  num = Number(num);
  
  // If user sends bad answer we don't want to create error.  we want to record the bad answer and let the other user judge.  but either way both users will not be able to go to the next question.
  const htmlString = req.body.answer;
  let htmlElementTest = htmlString.match(/(?:<[^>]*>)/g);
  
  if (htmlElementTest === null || htmlElementTest.length < 2) {
    UserStats.findOne({ userId }, function(err, userStats) {
      userStats.totalPoints = userStats.totalPoints -= 25;
      userStats.htmlTotalPoints = userStats.htmlTotalPoints -= 25; 
      userStats.save(function(err) {
        if(err) {
          console.log('ERROR! Updating User Stats');
        }
      });
    })
      .then(result => {
        res.json({ error: true, message: 'Answer not valid html' });
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  } else {
    // Create reusable Promise for incorrect answers
    const handleIncorrectHTMLPromise = new Promise(function(resolve, reject) {
      resolve(handleHTMLIncorrect(userId));
    });
    if (num === 0) {
      try {
        htmlAnswer1(htmlString, res, userId);
      }
      catch (e) {
        handleIncorrectHTMLPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } else if (num === 1) {
      try {
        htmlAnswer2(htmlString, res, userId);
      }
      catch (e) {
        handleIncorrectHTMLPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } else if (num === 2) {
      try {
        htmlAnswer3(htmlString, res, userId);
      }
      catch (e) {
        handleIncorrectHTMLPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } else if (num === 3) {
      try {
        htmlAnswer4(htmlString, res, userId);
      }
      catch (e) {
        handleIncorrectHTMLPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } else if (num === 4) { 
      try {
        htmlAnswer5(htmlString, res, userId); 
      }
      catch (e) {
        handleIncorrectHTMLPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      }
    }
  }
});

/*======POST /answers Endpoint CSS Answers=====*/
router.post('/answers/cssQuestions/:num', (req,res,next) => {
  const userId = req.user._id;
  let { num } = req.params;
  num = Number(num);
  
  // If user sends bad answer we don't want to create error.  we want to record the bad answer and let the other user judge.  but either way both users will not be able to go to the next question.
  const cssString = req.body.answer;
  
  // may not need --
  let cssElementTest = cssString.match(/(?:<[^>]*>)/g);

  // function to validate answer has open and closing curly brackets
  function findCurlyBrackets(string) {
    if (string.includes('{') && string.includes('}')) {
      return true;
    }
  }
  let hasCurlyBraces = findCurlyBrackets(cssString);
  
  if (cssString === null) {
    UserStats.findOne({ userId }, function(err, userStats) {
      userStats.totalPoints = userStats.totalPoints -= 25;
      userStats.cssTotalPoints = userStats.cssTotalPoints -= 25; 
      userStats.save(function(err) {
        if(err) {
          console.log('ERROR! Updating User Stats');
        }
      });
    })
      .then(result => {
        res.json({ error: true, message: 'Answer cannot be blank' });
      })
      .catch(err => {
        return res.status(err.code).json(err);
      });
  } else {
    // Create reusable Promise for incorrect answers
    const handleIncorrectCSSPromise = new Promise(function(resolve, reject) {
      resolve(handleCSSIncorrect(userId));
    });
    if (num === 0) {
      try {
        cssAnswer1(cssString, res, userId);
      }
      catch (e) {
        handleIncorrectCSSPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } else if (num === 1) {
      try {
        cssAnswer2(cssString, res, userId);
      }
      catch (e) {
        handleIncorrectCSSPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } else if (num === 2) {
      try {
        cssAnswer3(cssString, res, userId);
      }
      catch (e) {
        handleIncorrectCSSPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } else if (num === 3) {
      try {
        cssAnswer4(cssString, res, userId);
      }
      catch (e) {
        handleIncorrectCSSPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } else if (num === 4) {
      try {
        cssAnswer5(cssString, res, userId);
      }
      catch (e) {
        handleIncorrectCSSPromise
          .then(() => {
            res.json({error: true, message: 'Answer is incorrect'});
          });
      } 
    } 
  }
});

/*======POST / Endpoint Approve/Deny judgement=====*/
router.post('/judgment/:room',(req,res,next)=>{
  const userId = req.user._id;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  let { room } = req.params;
  const verdict = req.body.answer;
  // Increment/Decrement Total Points + RoomType points
  if (room === 'jsQuestions') {
    if (verdict === 'correct') {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints += 25;
        userStats.javascriptTotalPoints = userStats.javascriptTotalPoints += 25; 
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    } else {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints -= 25;
        userStats.javascriptTotalPoints = userStats.javascriptTotalPoints -= 25; 
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    }
  } else if (room === 'htmlQuestions') {
    if (verdict === 'correct') {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints += 25;
        userStats.htmlTotalPoints = userStats.htmlTotalPoints += 25; 
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    } else {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints -= 25;
        userStats.htmlTotalPoints = userStats.htmlTotalPoints -= 25; 
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    }
  } else if (room === 'cssQuestions') {
    if (verdict === 'correct') {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints += 25;
        userStats.cssTotalPoints = userStats.cssTotalPoints += 25; 
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    } else {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints -= 25;
        userStats.cssTotalPoints = userStats.cssTotalPoints -= 25; 
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    }
  } else if (room === 'dsaQuestions') {
    if (verdict === 'correct') {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints += 25;
        userStats.dsaTotalPoints = userStats.dsaTotalPoints += 25; 
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    } else {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints -= 25;
        userStats.dsaTotalPoints = userStats.dsaTotalPoints -= 25; 
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    }
  }
});

module.exports = router;