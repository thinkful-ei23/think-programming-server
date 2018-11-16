'use strict';
const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

module.exports = (evaluateElement, cssString, res, userId, next) => { 
  const evaluatePromise = new Promise(function(resolve, reject) {
    resolve(evaluateElement(cssString));
  });
  evaluatePromise
    .then(() => {
      return UserStats.findOne({ userId })
        .then(userStats => {
          userStats.totalPoints += 100;
          userStats.totalAnswered += 1;
          userStats.totalCorrect += 1;
          userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
          userStats.cssTotalPoints += 100; 
          userStats.cssTotalAnswered += 1;
          userStats.cssTotalCorrect += 1;
          userStats.cssCorrectPercentage = (userStats.cssTotalCorrect/userStats.cssTotalAnswered * 100).toFixed(2); 
          return userStats.save();
        })
        .then(() => {
          res.json({error: false, message: 'Correct! Challenge Completed! +100 Total Points, +100 CSS Points!'}).end();
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    })
    .catch(err => {
      return res.status(err.code).json(err);
    });
};