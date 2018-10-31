'use strict';
const express = require('express');
const mongoose = require('mongoose');
const GameQuestions = require('../models/gameQuestions');

const router = express.Router();

/*======GET Endpoint for quiz questions=====*/
router.get('/gameroom/questions/:questionType',(req,res,next)=>{
  const { questionType } = req.params;
  console.log(typeof questionType, 'SEARCH THIS QUESTION')
  GameQuestions.findOne()
    .then(result => {
      res.json(result[`${questionType}`]);
    })
    .catch(err => {
      if (err.reason === 'Error GET /gameroom/questions') {
        return res.status(err.code).json(err);
      }
      next(err);
    });
});

module.exports = router;