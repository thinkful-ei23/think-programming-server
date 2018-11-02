'use strict';
const express = require('express');

const socket = require('socket.io');

const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const passport = require('passport');
const localStrategy = require('./passport/localStrategy');
const jwtStrategy = require('./passport/jwt');

const { CLIENT_ORIGIN, PORT, MONGODB_URI } = require('./config');

/*===Import Routers====*/
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const gameRoomRouter = require('./routes/gameRoom');

/*=========Create Express Application========*/
const app = express();
const server = require('http').createServer(app);
const io = socket(server);

/*========Morgan Middleware to Log all requests=======*/
app.use(
  morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
    skip: () => process.env.NODE_ENV === 'test'
  })
);
// test
/*======CORS Middleware=====*/
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};
app.use(cors(corsOption));

/*=======Parse Request Body======*/
app.use(express.json());


/* Utilize the Passport`stategy`*/
passport.use(localStrategy);
passport.use(jwtStrategy);

/*======Protect Endpoints Using JWT Strategy======*/
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});

/*=======Routing=======*/
app.get('/api/test', (req, res) => res.send('Hello World!'));
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api', gameRoomRouter);

/*=======Custom 404 Not Found route handler=======*/
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*==========Custom Error Handler==========*/
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/*====Socket.io Server====*/
let rooms = [];
const jsSocket = io.of('/jsQuestions');
jsSocket.on('connection', (socket) => {
  console.log(socket.id, 'socket ID');
  socket.emit('ROOMS', rooms);
  socket.on('NEW_ROOM', function(username){
    const current = rooms.find(room => room.user1 === username);
    if(!current){
      rooms.push({id: Date.now(), user1: username, user2: null});
    }
    io.of('/jsQuestions').emit('NEW_ROOM', rooms);
  })
  socket.on('JOIN_ROOM', function({roomId, username}){
    const room = rooms.find(room => room.id === roomId);
    room.user2 = username;
    rooms = rooms.filter($room => $room.id !== room.id);
    io.of('/jsQuestions').emit('MATCH', {room, rooms});
  })
  socket.on('SIT', function(data){
    console.log(data, 'Player Sat');
    io.emit('SIT', data);
  })
  socket.on('TYPING', function(data){
    console.log(data, 'Messaged Recieved!');
    io.emit('TYPING', data);
  });
  socket.on('FINISHED', function(data){
    console.log(data, 'Finshed Button Pressed!');
    io.emit('FINISHED', data);
  });
});

/*====Connect to DB and Listen for incoming connections====*/

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGODB_URI)
    .then(instance => {
      const conn = instance.connections[0];
      console.info(
        `Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`
      );
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error('\n === Did you remember to start `mongod`? === \n');
      console.error(err);
    })
    .then(() => {
      server.listen(PORT, function() {
        console.info(`Server listening on ${this.address().port}`);
      })
        .on('error', err => {
          console.error(err);
        });
    });
}

/*======= Export for testing =======*/
module.exports = app;
