'use strict';



exports.handleUsers = (socket, io, totalUsersArray) => {
  socket.on('USERS', (incomingUser) => {
    console.log('User Connection', incomingUser);
    const currentUsers = totalUsersArray.find(username => username === incomingUser);
    if (!currentUsers) {
      totalUsersArray.push(incomingUser);
    }
    io.of('/dashboard').emit('USERS', totalUsersArray);
  });
};

exports.handleUserLogout = (socket, io, totalUsersArray) => {
  socket.on('USER_EXIT', outGoingUser => {
    console.log('User Logged Out');
    let index = totalUsersArray.indexOf(outGoingUser);
    if (index > -1 ) {
      totalUsersArray.splice(index, 1);
    }
    io.of('/dashboard').emit('USERS', totalUsersArray);
  });
};

exports.handleAllPlayers = (socket, io, allPlayersObject, totalUsers) => {
  socket.on('ALL_PLAYERS', incoming => {
    io.of('/dashboard').emit('ALL_PLAYERS', allPlayersObject);
  });
};