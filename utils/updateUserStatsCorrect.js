'use strict';

const UserStats = require('../models/userStats');

module.exports = function(userId, points, answered, incorrect, field){
  return UserStats.findOne({ userId })
    .then(userStats => {
      userStats.totalPoints -= points;
      userStats.totalAnswered += answered;
      userStats.totalIncorrect += incorrect;
      userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
      userStats[`${field}TotalPoints`] -= points;
      userStats[`${field}TotalAnswered`] += answered;
      userStats[`${field}TotalIncorrect`] += incorrect;
      userStats[`${field}CorrectPercentage`] = (userStats[`${field}TotalCorrect`]/userStats[`${field}TotalAnswered`] * 100).toFixed(2); 
      return userStats.save();
    });
};