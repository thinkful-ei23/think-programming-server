// /*====Socket.io Server====*/
// let jsRooms = [];
// const jsSocket = io.of('/jsQuestions');
// jsSocket.on('connection', (socket) => {
//   console.log(socket.id, 'socket ID');
//   // socket.emit('ROOMS', jsRooms);
//   // socket.on('NEW_ROOM', function(username){
//   //   const current = jsRooms.find(room => room.user1 === username);
//   //   if(!current){
//   //     jsRooms.push({id: Date.now(), user1: username, user2: null});
//   //   }
//   //   io.of('/jsQuestions').emit('NEW_ROOM', jsRooms);
//   // });
//   // socket.on('JOIN_ROOM', function({roomId, username}){
//   //   const room = jsRooms.find(room => room.id === roomId);
//   //   room.user2 = username;
//   //   jsRooms = jsRooms.filter($room => $room.id !== room.id);
//   //   io.of('/jsQuestions').emit('MATCH', {room, jsRooms});
//   // });
//   socket.on('SIT', function(data){
//     console.log(data, 'Player Sat');
//     io.of('jsQuestions').emit('SIT', data);
//   });
//   socket.on('STAND', function(data){
//     console.log(data, 'Player Stood');
//     io.of('jsQuestions').emit('STAND', data);
//   });
//   socket.on('TYPING', function(data){
//     console.log(data, 'Messaged Recieved!');
//     io.of('/jsQuestions').emit('TYPING', data);
//   });
//   socket.on('FINISHED', function(data){
//     console.log(data, 'Finshed Button Pressed!');
//     io.of('jsQuestions').emit('FINISHED', data);
//   });
// });