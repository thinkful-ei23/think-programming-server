'use strict';

const mongoose = require('mongoose');
const UserStats = require('../../../models/userStats');

module.exports = (evaluateElement, htmlString, str1, str2, res, userId, next) => {
  const evaluatePromise = new Promise(function(resolve, reject) {
    console.log(str2, 'HERE')
    resolve(evaluateElement(htmlString, str1, str2));
    console.log('not here')
  });
  evaluatePromise   
    .then(() => {
      return UserStats.findOne({ userId })
        .then(userStats => {
          userStats.totalPoints += 100;
          userStats.totalAnswered += 1;
          userStats.totalCorrect += 1;
          userStats.correctPercentage = (userStats.totalCorrect/userStats.totalAnswered * 100).toFixed(2);
          userStats.htmlTotalPoints += 100; 
          userStats.htmlTotalAnswered += 1;
          userStats.htmlTotalCorrect += 1;
          userStats.htmlCorrectPercentage = (userStats.htmlTotalCorrect/userStats.htmlTotalAnswered * 100).toFixed(2); 
          return userStats.save();
        })
        .then(() => {
          res.json({error: false, message: 'Correct! Challenge Completed! +100 Total Points, +100 HTML Points!'}).end();
        })
        .catch(err => {
          return res.status(err.code).json(err);
        });
    })
    .catch(err => {
      return res.status(err.code).json(err);
    });
};