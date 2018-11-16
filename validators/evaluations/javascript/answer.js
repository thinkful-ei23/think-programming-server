'use strict';
const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');
const updateUserStats = require('../../../utils/updateUserStats');

module.exports = (evaluateElement, jsString, input, output,res, userId, next) => {
  const evaluatePromise = new Promise(function(resolve, reject) {
    resolve(evaluateElement(jsString, input, output))
      .catch(err => {
        updateUserStats(userId, 25, 'incorrect', 'javascript')
          .then(() => {
            res.json({error: true, message: 'Incorrect! Challenge not Completed! -25 Total Points, -25 Javascript Points!'}).end();
          });
      });
  });
  evaluatePromise  
    .then(() => {
      return UserStats.findOne({ userId })
        .then(userStats => {
          userStats.totalPoints += 100;
          userStats.totalAnswered += 1;
          userStats.totalCorrect += 1;
          userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
          userStats.javascriptTotalPoints += 100; 
          userStats.javascriptTotalAnswered += 1;
          userStats.javascriptTotalCorrect += 1;
          userStats.javascriptCorrectPercentage = (userStats.javascriptTotalCorrect/userStats.javascriptTotalAnswered * 100).toFixed(2); 
          return userStats.save();
        }) 
        .then(() => {
          res.json({error: false, message: 'Correct! Challenge Completed! +100 Total Points, +100 Javascript Points!'}).end();
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    })
    .catch(err => {
      updateUserStats(userId, 25, 'incorrect', 'javascript')
        .then(() => {
          res.json({error: true, message: 'Incorrect! Challenge not Completed! -25 Total Points, -25 Javascript Points!'}).end();
        });
    });
};