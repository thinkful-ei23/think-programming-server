'use strict';
const {evaluateElement} = require('../../helpers/css/css-helper4');
const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

module.exports = (cssString, res, userId) => {  
  return Promise.all([evaluateElement(cssString)])
    .then(() => {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints += 100;
        userStats.totalAnswered = userStats.totalAnswered += 1;
        userStats.totalCorrect = userStats.totalCorrect += 1;
        userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
        userStats.cssTotalPoints = userStats.cssTotalPoints += 100; 
        userStats.cssTotalAnswered = userStats.cssTotalAnswered += 1;
        userStats.cssTotalCorrect += 1;
        userStats.cssCorrectPercentage = (userStats.cssTotalCorrect/userStats.cssTotalAnswered * 100).toFixed(2); 
  
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      });
      res.json({error: false, message: 'Correct! Challenge Completed! +100 Total Points, +100 CSS Points!'}).end();
    })
    .catch(e => {
      console.log(e);
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints -= 25;
        userStats.totalAnswered = userStats.totalAnswered += 1;
        userStats.totalIncorrect = userStats.totalIncorrect += 1;
        userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
        userStats.cssTotalPoints = userStats.cssTotalPoints -= 25; 
        userStats.cssTotalAnswered = userStats.cssTotalAnswered += 1;
        userStats.cssTotalIncorrect += 1;
        userStats.cssCorrectPercentage = (userStats.cssTotalCorrect/userStats.cssTotalAnswered * 100).toFixed(2);
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      });
      res.json({error: true, message: e}).end();
    });
};