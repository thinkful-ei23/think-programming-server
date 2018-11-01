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
      let server = app.listen(PORT, function() {
        console.info(`Server listening on ${this.address().port}`);
      })
        .on('error', err => {
          console.error(err);
        });
        /*====Socket.io Server====*/
      let io = socket(server);
      const nsp0 = io.of('/gameroom0/jsQuestions');
      nsp0.on('connnection', socket => {
        console.log('Room0 Connection');     
        nsp0.to('SIT', data => {
          console.log(data, 'Player Sat');
          nsp0.emit('SIT', data);
        });
        nsp0.to('STAND', data => {
          console.log(data, 'Player Stood');
          nsp0.emit('STAND', data);
        });
        nsp0.to('TYPING ', data => {
          console.log(data, 'Messaged Recieved!');
          nsp0.emit('TYPING', data);
        });
        nsp0.to('FINISHED', data => {
          console.log(data, 'Finshed Button Pressed!');
          nsp0.emit('FINISHED', data);
        });
      });
      const nsp1 = io.of('/gameroom1/htmlQuestions');
      nsp1.on('connnection', socket => {
        console.log('Room1 Connection');     
        nsp1.on('SIT', data => {
          console.log(data, 'Player Sat');
          nsp1.emit('SIT', data);
        });
        nsp1.on('STAND', data => {
          console.log(data, 'Player Stood');
          nsp1.emit('STAND', data);
        });
        nsp1.on('TYPING ', data => {
          console.log(data, 'Messaged Recieved!');
          nsp1.emit('TYPING', data);
        });
        nsp1.on('FINISHED', data => {
          console.log(data, 'Finshed Button Pressed!');
          nsp1.emit('FINISHED', data);
        });
      });
      const nsp2 = io.of('/gameroom2/cssQuestions');
      nsp2.on('connnection', socket => {
        console.log('Room2 Connection');     
        nsp2.on('SIT', data => {
          console.log(data, 'Player Sat');
          nsp2.emit('SIT', data);
        });
        nsp2.on('STAND', data => {
          console.log(data, 'Player Stood');
          nsp2.emit('STAND', data);
        });
        nsp2.on('TYPING ', data => {
          console.log(data, 'Messaged Recieved!');
          nsp2.emit('TYPING', data);
        });
        nsp2.on('FINISHED', data => {
          console.log(data, 'Finshed Button Pressed!');
          nsp2.emit('FINISHED', data);
        });
      });
      const nsp3 = io.of('/gameroom3/dsaQuestions');
      nsp3.on('connnection', socket => {
        console.log('Room3 Connection');     
        nsp3.on('SIT', data => {
          console.log(data, 'Player Sat');
          nsp3.emit('SIT', data);
        });
        nsp3.on('STAND', data => {
          console.log(data, 'Player Stood');
          nsp3.emit('STAND', data);
        });
        nsp3.on('TYPING ', data => {
          console.log(data, 'Messaged Recieved!');
          nsp3.emit('TYPING', data);
        });
        nsp3.on('FINISHED', data => {
          console.log(data, 'Finshed Button Pressed!');
          nsp3.emit('FINISHED', data);
        });
      });
    });
}

/*======= Export for testing =======*/
module.exports = app;
