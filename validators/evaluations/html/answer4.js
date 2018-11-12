'use strict';
const {evaluateElement} = require('../../helpers/html/html-helper4');
const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

module.exports = (htmlString, res, userId) => {  
  return Promise.all([evaluateElement(htmlString, 'h2', 'Think Programming')])
    .then(() => {
      UserStats.findOne({ userId }, function(err, userStats) {
        userStats.totalPoints = userStats.totalPoints += 100;
        userStats.totalAnswered = userStats.totalAnswered += 1;
        userStats.totalCorrect = userStats.totalCorrect += 1;
        userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
        userStats.htmlTotalPoints = userStats.htmlTotalPoints += 100; 
        userStats.htmlTotalAnswered = userStats.htmlTotalAnswered += 1;
        userStats.htmlTotalCorrect += 1;
        userStats.htmlCorrectPercentage = (userStats.htmlTotalCorrect/userStats.htmlTotalAnswered * 100).toFixed(2); 
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
        userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
        userStats.htmlTotalPoints = userStats.htmlTotalPoints -= 25; 
        userStats.htmlTotalAnswered = userStats.htmlTotalAnswered += 1;
        userStats.htmlTotalIncorrect += 1;
        userStats.htmlCorrectPercentage = (userStats.htmlTotalCorrect/userStats.htmlTotalAnswered * 100).toFixed(2);
        userStats.save(function(err) {
          if(err) {
            console.log('ERROR! Updating User Stats');
          }
        });
      });
      res.json({error: true, message: e});
    });
};