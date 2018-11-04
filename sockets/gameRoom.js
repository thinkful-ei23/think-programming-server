'use strict';

exports.handleGetPlayerArray = (socket, io, nsString, playersArray) => {
  socket.on('PLAYERS', data => {
    console.log(data.username, 'requested playersArray');
    io.of(nsString).emit('PLAYERS', playersArray);
  });
};
exports.handleSit = (socket, io, nsString, playersArray) => {
  socket.on('SIT', data => {
    playersArray.push(data.username);
    console.log(data, 'Player Sat');
    io.of(nsString).emit('SIT', data);
    io.of(nsString).emit('PLAYERS', playersArray);
  });
};
exports.handleStand = (socket, io, nsString, playersArray) => {
  socket.on('STAND', data => {
    let index = playersArray.indexOf(data.username);
    if (index > -1 ) {
      playersArray.splice(index, 1);
    }
    console.log(data, 'Player Stood');
    io.of(nsString).emit('STAND', data);
    io.of(nsString).emit('PLAYERS', playersArray);
  });
};
exports.handleTyping = (socket, io, nsString) => {
  socket.on('TYPING', data => {
    console.log(data, 'Message Recieved!');
    io.of(nsString).emit('TYPING', data);
  });
};
exports.handleFinished = (socket, io, nsString) => {
  socket.on('FINISHED', data => {
    console.log(data, 'Player Finished!');
    io.of(nsString).emit('FINISHED', data);
  });
};
exports.handlePlayerLeave = (socket, io, nsString, playersArray) => {
  socket.on('LEAVE_GAME', username => {
    console.log(username, 'Left Room!');
    console.log(playersArray, 'B');
    let index = playersArray.indexOf(username);
    if (index > -1 ) {
      playersArray.splice(index, 1);
    }
    console.log(playersArray, 'A');
    io.of(nsString).emit('LEAVE_GAME', playersArray);
    console.log('getting stuck?')
  });
};