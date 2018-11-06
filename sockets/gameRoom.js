'use strict';

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
  socket.on('APPROVE', questionIndex => {
    questionIndex += 1;
    io.of(nsString).emit('APPROVE', questionIndex);
  });
};
exports.handleReset = (socket, io, nsString) => {
  socket.on('RESET', username => {
    io.of(nsString).emit('RESET', username);
  });
};
exports.handleWrong = (socket, io, nsString) => {
  socket.on('WRONG', username => {
    io.of(nsString).emit('WRONG', username);
  });
};