'use strict';
const express = require('express');
const mongoose = require('mongoose');
const GameQuestions = require('../models/gameQuestions');

const {evaluateFn} = require('./../validators/helpers/javascript');
const {evaluateElement} = require('./../validators/helpers/html');
const {evaluateCSSClass, evaluateCSSProperty} = require('./../validators/helpers/css');

const htmlAnswer1 = require('../validators/evaluations/html/answer1');
const htmlAnswer2 = require('../validators/evaluations/html/answer2');
const htmlAnswer3 = require('../validators/evaluations/html/answer3');
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
  const { num } = req.params;
  const jsString = req.body.answer;
  try {  
    evaluateFn(jsString, {a: 1, b:2}, 3);
    console.log({error: false, message: 'Challenge completed'});
  } catch(e) {
    res.json({error: true, message: 'Incorrect Answer'}); 
  }
});

/*======POST /answers Endpoint html Answers=====*/
router.post('/answers/htmlQuestions/:num',(req,res,next)=>{
  let { num } = req.params;
  num = Number(num);
  const htmlString = req.body.answer;
  console.log('num', num, 'htmlString', htmlString);
  if (num === 0) {
    htmlAnswer1(htmlString, res);
  } else if (num === 1) {
    htmlAnswer2(htmlString, res);
  } else if (num === 2) {
    htmlAnswer3(htmlString, res);
  }
});

// const htmlString = `<h1>This is a te</h1>`;
// try{  
//   evaluateElement(htmlString, 'h1');
//   console.log({error: false, message: "Challenge completed"});
// }catch(e){
//   console.log(e);
//   console.log({error: true, message: "Incorrect Answer"});
// }

// const cssString = `.test{
//   color: #FFF;
//   background: #333
//   font-size: 1em;
// }`;
// try{  
//   evaluateCSSClass(cssString, 'test');
//   evaluateCSSProperty(cssString, 'color', '#FFF');
//   evaluateCSSProperty(cssString, 'background', '#FFF');
//   console.log({error: false, message: "Challenge completed"});
// }catch(e){
//   console.log(e);
//   console.log({error: true, message: "Incorrect Answer"});
// }

// const jsString = `function test(a, b){
//   return a;
// }`;


module.exports = router;