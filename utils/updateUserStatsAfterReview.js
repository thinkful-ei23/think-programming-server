'use strict';

const UserStats = require('../models/userStats');
// to be used when clicking 'Approve' or 'Try Again' buttons on client
// if correct points will be 50 if not will be 25
// result will be 'correct' or 'incorrect'
// field will be room type like 'jsQuestions'
module.exports = function(userId, points, result, field){
  return UserStats.findOne({ userId })
    .then(userStats => {
      result === 'correct' ? userStats.totalPoints += points : userStats.totalPoints -= points;
      result === 'correct' ? userStats[`${field}TotalPoints`] += points : userStats[`${field}TotalPoints`] -= points;
      return userStats.save();
    });
};