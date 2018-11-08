'use strict';
const express = require('express');
const mongoose = require('mongoose');
const UserStats = require('../models/userStats');

const router = express.Router();
// console.log('triggered?????')
/*======GET Endpoint for MyStats=====*/
router.get('/mystats',(req,res,next)=>{
  const userId = req.user._id;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  
  UserStats.findOne({ userId })
    .then(myStats => {
      res.json(myStats);
    })
    .catch(err => {
      if (err.reason === 'Error GET /stats/mystats') {
        return res.status(err.code).json(err);
      }
      next(err);
    });
});

module.exports = router;