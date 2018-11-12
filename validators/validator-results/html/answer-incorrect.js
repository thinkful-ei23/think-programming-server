'use strict';

const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

exports.handleHTMLIncorrect = (userId) => {
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
};
