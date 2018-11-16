'use strict';

const UserStats = require('../models/userStats');

// if correct points will be 100 if not will be 25
// result will be 'correct' or 'incorrect'
// field will be room type like 'jsQuestions'
module.exports = function(userId, points, result, field){
  return UserStats.findOne({ userId })
    .then(userStats => {
      result === 'correct' ? userStats.totalPoints += points : userStats.totalPoints -= points;
      userStats.totalAnswered += 1;
      result === 'correct' ? userStats.totalCorrect += 1 : userStats.totalIncorrect += 1;
      userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
      result === 'correct' ? userStats[`${field}TotalPoints`] += points : userStats[`${field}TotalPoints`] -= points;
      userStats[`${field}TotalAnswered`] += 1;
      result === 'correct' ? userStats[`${field}TotalCorrect`] += 1 : userStats[`${field}TotalIncorrect`] += 1;  
      userStats[`${field}CorrectPercentage`] = (userStats[`${field}TotalCorrect`]/userStats[`${field}TotalAnswered`] * 100).toFixed(2); 
      return userStats.save();
    });
};