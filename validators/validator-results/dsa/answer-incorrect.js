'use strict';

const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

exports.handleDSAIncorrect = (userId) => {
  UserStats.findOne({ userId }, function(err, userStats) {
    userStats.totalPoints = userStats.totalPoints -= 25;
    userStats.totalAnswered = userStats.totalAnswered += 1;
    userStats.totalIncorrect = userStats.totalIncorrect += 1;
    userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
    userStats.dsaTotalPoints = userStats.dsaTotalPoints -= 25; 
    userStats.dsaTotalAnswered = userStats.dsaTotalAnswered += 1;
    userStats.dsaTotalIncorrect += 1;
    userStats.dsaCorrectPercentage = (userStats.dsaTotalCorrect/userStats.dsaTotalAnswered * 100).toFixed(2);
    userStats.save(function(err) {
      if(err) {
        console.log('ERROR! Updating User Stats');
      }
    });
  });
};
