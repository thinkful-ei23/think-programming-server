'use strict';

const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

exports.handleJavaScriptIncorrect = (userId) => {
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
};