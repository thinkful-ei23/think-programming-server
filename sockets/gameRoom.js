'use strict';

exports.handleSit = (socket, io, string) => {
  socket.on('SIT', data => {
    console.log(data, 'Player Sat');
    io.of(string).emit('SIT', data);
  });
};
exports.handleStand = (socket, io, string) => {
  socket.on('STAND', data => {
    console.log(data, 'Player Stood');
    io.of(string).emit('STAND', data);
  });
};
exports.handleTyping = (socket, io, string) => {
  socket.on('TYPING', data => {
    console.log(data, 'Message Recieved!');
    io.of(string).emit('TYPING', data);
  });
};
exports.handleFinished = (socket, io, string) => {
  socket.on('FINISHED', data => {
    console.log(data, 'Player Finished!');
    io.of(string).emit('FINISHED', data);
  });
};