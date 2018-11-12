'use strict';
const GameQuestions = require('../models/gameQuestions');

exports.handleGetPlayerArray = (socket, io, nsString, playersArray) => {
  socket.on('PLAYERS', data => {
    io.of(nsString).emit('PLAYERS', playersArray);
  });
};
exports.handleSit = (socket, io, nsString, playersArray, allPlayersObject) => {
  socket.on('SIT', data => {
    let index = playersArray.indexOf(data.username);
    if (index < 1) {
      playersArray.push(data.username);
    }
    io.of(nsString).emit('SIT', data);
    io.of(nsString).emit('PLAYERS', playersArray);
    io.of('/dashboard').emit('ALL_PLAYERS',  allPlayersObject);
    console.log('ALL PLAYERS OBJECT', allPlayersObject);
  });
};
exports.handleStand = (socket, io, nsString, playersArray, allPlayersObject) => {
  socket.on('STAND', data => {
    let index = playersArray.indexOf(data.username);
    if (index > -1 ) {
      playersArray.splice(index, 1);
    }
    io.of(nsString).emit('STAND', data);
    io.of(nsString).emit('PLAYERS', playersArray);
    io.of('/dashboard').emit('ALL_PLAYERS',  allPlayersObject);
  });
};
exports.handleTyping = (socket, io, nsString) => {
  socket.on('TYPING', data => {
    io.of(nsString).emit('TYPING', data);
  });
};
exports.handleFinished = (socket, io, nsString) => {
  socket.on('FINISHED', data => {
    io.of(nsString).emit('FINISHED', data);
  });
};
exports.handleAnswered = (socket, io, nsString) => {
  socket.on('ANSWERED', answerObject => {
    io.of(nsString).emit('ANSWERED', answerObject);
  });
};
exports.handlePlayerLeave = (socket, io, nsString, playersArray, allPlayersObject) => {
  socket.on('LEAVE_GAME', username => {
    let index = playersArray.indexOf(username);
    if (index > -1 ) {
      playersArray.splice(index, 1);
    }
    let questionIndex = 0;
    io.of(nsString).emit('LEAVE_GAME', playersArray);
    io.of(nsString).emit('RESET', questionIndex);
    io.of('/dashboard').emit('ALL_PLAYERS',  allPlayersObject);
  });
};
exports.handleApprove = (socket, io, nsString) => {
  socket.on('APPROVE', dataObject => {
    dataObject.currentIndex += 1;
    let num;
    GameQuestions.findOne()
      .then(result => {
        num = result[`${dataObject.room}`].length;
        if (dataObject.currentIndex >= num) {
          dataObject.currentIndex = 0;
          io.of(nsString).emit('APPROVE', dataObject.currentIndex);
        } else {
          io.of(nsString).emit('APPROVE', dataObject.currentIndex);
        }
      })
      .catch(err => {
        if (err.reason === 'Error GET /gameroom/questions') {
          console.log(err.reason);
        }
      });
  });
};
exports.handleReset = (socket, io, nsString) => {
  socket.on('RESET', username => {
    io.of(nsString).emit('RESET', username);
  });
};
exports.handleWrong = (socket, io, nsString) => {
  socket.on('WRONG', data => {
    console.log('Wrong Answer');
    io.of(nsString).emit('WRONG', data);
  });
};