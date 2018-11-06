'use strict';
const express = require('express');
const mongoose = require('mongoose');
const GameQuestions = require('../models/gameQuestions');

// const {evaluateFn} = require('../validators/helpers/javascript/javascript-helper1');
// const {evaluateElement} = require('../validators/helpers/html/html-helper3');
// const {evaluateCSSClass, evaluateCSSProperty} = require('../validators/helpers/css/css');
const jsAnswer1 = require('../validators/evaluations/javascript/answer1');
const jsAnswer2 = require('../validators/evaluations/javascript/answer2');
const jsAnswer3 = require('../validators/evaluations/javascript/answer3');
const jsAnswer4 = require('../validators/evaluations/javascript/answer4');
const htmlAnswer1 = require('../validators/evaluations/html/answer1');
const htmlAnswer2 = require('../validators/evaluations/html/answer2');
const htmlAnswer3 = require('../validators/evaluations/html/answer3');
const htmlAnswer4 = require('../validators/evaluations/html/answer4');

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
  let { num } = req.params;
  num = Number(num);
  const jsString = req.body.answer;
  if (num === 0) {
    jsAnswer1(jsString, res);
  } else if (num === 1) {
    jsAnswer2(jsString, res);
  } else if (num === 2) {
    jsAnswer3(jsString, res);
  } else if (num === 3) {
    jsAnswer4(jsString, res);
  }

});

/*======POST /answers Endpoint html Answers=====*/
router.post('/answers/htmlQuestions/:num',(req,res,next)=>{
  let { num } = req.params;
  num = Number(num);
  const htmlString = req.body.answer;
  if (num === 0) {
    htmlAnswer1(htmlString, res);
  } else if (num === 1) {
    htmlAnswer2(htmlString, res);
  } else if (num === 2) {
    htmlAnswer3(htmlString, res);
  } else if (num === 3) {
    htmlAnswer4(htmlString, res);
  }
});

module.exports = router;