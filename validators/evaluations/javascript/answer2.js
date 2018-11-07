'use strict';
const {evaluateFn} = require('../../helpers/javascript/javascript-helper1');
const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

module.exports = (jsString, res, userId) => {  
  return Promise.all([evaluateFn(jsString, {num1: 3, num2: 7}, 21)])
    .then(() => {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints += 100;
        userStats.totalAnswered = userStats.totalAnswered += 1;
        userStats.totalCorrect = userStats.totalCorrect += 1;
        userStats.correctPercentage = userStats.totalCorrect/userStats.totalAnswered * 100;
        userStats.javascriptTotalPoints = userStats.javascriptTotalPoints += 100; 
        userStats.javascriptTotalAnswered = userStats.javascriptTotalAnswered += 1;
        userStats.javascriptTotalCorrect += 1;
        userStats.javascriptCorrectPercentage = userStats.javascriptTotalCorrect/userStats.javascriptTotalAnswered * 100; 

        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      });
      res.json({error: false, message: 'Challenge completed'});
    })
    .catch(e => {
      console.log(e);
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints -= 25;
        userStats.totalAnswered = userStats.totalAnswered += 1;
        userStats.totalIncorrect = userStats.totalIncorrect += 1;
        userStats.correctPercentage = userStats.totalCorrect/userStats.totalAnswered * 100;
        userStats.javascriptTotalPoints = userStats.javascriptTotalPoints -= 25; 
        userStats.javascriptTotalAnswered = userStats.javascriptTotalAnswered += 1;
        userStats.javascriptTotalIncorrect += 1;
        userStats.javascriptCorrectPercentage = userStats.javascriptTotalCorrect/userStats.javascriptTotalAnswered * 100;
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      });
      res.json({error: true, message: e});
    });
};