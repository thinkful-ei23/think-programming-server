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
const statsRouter = require('./routes/stats');

/*===Import Sockets====*/
const { handleUsers, handleUserLogout, handleAllPlayers } = require('./sockets/totalUsers');
const { handleGetPlayerArray, handleSit, handleStand, handleTyping, handleFinished, handleAnswered, handlePlayerLeave, handleApprove, handleReset, handleWrong } = require('./sockets/gameRoom');

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
app.use('/api/gameroom', jwtAuth, gameRoomRouter);
app.use('/api/stats', jwtAuth, statsRouter);

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
// Total Users Online Socket
let totalUsers = [];
let allRooms = {};
let jsPlayers = [];
let htmlPlayers = [];
let cssPlayers = [];
let dsaPlayers = [];
allRooms.jsPlayers = jsPlayers;
allRooms.htmlPlayers = htmlPlayers;
allRooms.cssPlayers = cssPlayers;
allRooms.dsaPlayers = dsaPlayers;
const userSocket = io.of('/dashboard');
userSocket.on('connection', (socket) => {
  console.log(socket.id, 'dashboard connection');
  handleUsers(socket, io, totalUsers);
  handleUserLogout(socket, io, totalUsers);
  handleAllPlayers(socket, io, allRooms);
});

// Chatroom 
const chatSocket = io.of('/chatroom');
chatSocket.on('connection', (socket) => {
  console.log(socket.id, 'chatroom connection');
  
  socket.on('new message', (message, name) => {
    console.log(name, 'connected to chat');
    console.log('message: ', message);
    
    io.of('/chatroom').emit('new message', {
      name: name,
      message: message
    });

    // socket.broadcast.emit('new message', {
    //   name: name,
    //   message: message
    // });
  });

});

// JavaScript Room Socket
let jsRooms = [];
const jsSocket = io.of('/jsQuestions');
jsSocket.on('connection', (socket) => {
  handleGetPlayerArray(socket, io, 'jsQuestions', jsPlayers);
  handleSit(socket, io, 'jsQuestions', jsPlayers, allRooms);
  handleStand(socket, io, 'jsQuestions', jsPlayers, allRooms);
  handleTyping(socket, io, 'jsQuestions');
  handleFinished(socket, io, 'jsQuestions');
  handleAnswered(socket, io, 'jsQuestions');
  handlePlayerLeave(socket, io, 'jsQuestions', jsPlayers, allRooms);
  handleApprove(socket, io, 'jsQuestions');
  handleReset(socket, io, 'jsQuestions');
  handleWrong(socket, io, 'jsQuestions');
});

// HTML Room Socket
let htmlRooms = [];
const htmlSocket = io.of('/htmlQuestions');
htmlSocket.on('connection', (socket) => {
  console.log(socket.id, 'socket ID');
  handleGetPlayerArray(socket, io, 'htmlQuestions', htmlPlayers);
  handleSit(socket, io, 'htmlQuestions', htmlPlayers, allRooms);
  handleStand(socket, io, 'htmlQuestions', htmlPlayers, allRooms);
  handleTyping(socket, io, 'htmlQuestions');
  handleFinished(socket, io, 'htmlQuestions');
  handleAnswered(socket, io, 'htmlQuestions');
  handlePlayerLeave(socket, io, 'htmlQuestions', htmlPlayers, allRooms);
  handleApprove(socket, io, 'htmlQuestions');
  handleReset(socket, io, 'htmlQuestions');
  handleWrong(socket, io, 'htmlQuestions');
});

// CSS Room Socket
let cssRooms = [];
const cssSocket = io.of('/cssQuestions');
cssSocket.on('connection', (socket) => {
  console.log(socket.id, 'socket ID');
  handleGetPlayerArray(socket, io, 'cssQuestions', cssPlayers);
  handleSit(socket, io, 'cssQuestions', cssPlayers, allRooms);
  handleStand(socket, io, 'cssQuestions', cssPlayers, allRooms);
  handleTyping(socket, io, 'cssQuestions');
  handleFinished(socket, io, 'cssQuestions');
  handleAnswered(socket, io, 'cssQuestions');
  handlePlayerLeave(socket, io, 'cssQuestions', cssPlayers, allRooms);
  handleApprove(socket, io, 'cssQuestions');
  handleReset(socket, io, 'cssQuestions');
  handleWrong(socket, io, 'cssQuestions');
});
// DSA Room Socket
let dsaRooms = [];
const dsaSocket = io.of('/dsaQuestions');
dsaSocket.on('connection', (socket) => {
  console.log(socket.id, 'socket ID');
  handleGetPlayerArray(socket, io, 'dsaQuestions', dsaPlayers);
  handleSit(socket, io, 'dsaQuestions', dsaPlayers, allRooms);
  handleStand(socket, io, 'dsaQuestions', dsaPlayers, allRooms);
  handleTyping(socket, io, 'dsaQuestions');
  handleFinished(socket, io, 'dsaQuestions');
  handleAnswered(socket, io, 'dsaQuestions');
  handlePlayerLeave(socket, io, 'dsaQuestions', dsaPlayers, allRooms);
  handleApprove(socket, io, 'dsaQuestions');
  handleReset(socket, io, 'dsaQuestions');
  handleWrong(socket, io, 'dsaQuestions');
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
