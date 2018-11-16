'use strict';

const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

exports.handleJavaScriptIncorrect = userId => {
  UserStats.findOne({ userId })
    .then(userStats => {
      userStats.totalPoints -= 25;
      userStats.totalAnswered += 1;
      userStats.totalIncorrect += 1;
      userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
      userStats.javascriptTotalPoints -= 25; 
      userStats.javascriptTotalAnswered += 1;
      userStats.javascriptTotalIncorrect += 1;
      userStats.javascriptCorrectPercentage =(userStats.javascriptTotalCorrect/userStats.javascriptTotalAnswered * 100).toFixed(2);
      return userStats.save();
    });
};