'use strict';

const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

exports.handleCSSIncorrect = (userId) => {
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
};
