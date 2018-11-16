'use strict';

const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

module.exports = (evaluateDSA, dsaString, res, userId) => {
  const evaluatePromise = new Promise(function(resolve, reject) {
    resolve(evaluateDSA(dsaString));
  });
  evaluatePromise  
    .then(() => {
      return UserStats.findOne({ userId })      .then(userStats => {
        userStats.totalPoints += 100;
        userStats.totalAnswered += 1;
        userStats.totalCorrect += 1;
        userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
        userStats.dsaTotalPoints += 100; 
        userStats.dsaTotalAnswered += 1;
        userStats.dsaTotalCorrect += 1;
        userStats.dsaCorrectPercentage = (userStats.dsaTotalCorrect/userStats.dsaTotalAnswered * 100).toFixed(2); 
        return userStats.save();
      })
        .then(() => {
          res.json({error: false, message: 'Correct! Challenge Completed! +100 Total Points, +100 DSA Points!'}).end();
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    })
    .catch(err => {
      return res.status(err.code).json(err);
    });
};