'use strict';
const User = require('./../models/user');
const seedUsers = require('../db/seed/users');
const GameQuestions = require('../models/gameQuestions');
const seedQuestions = require('../db/seed/gameQuestions');
const UserStats = require('../models/userStats');
const seedStats = require('../db/seed/userStats');

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { TEST_MONGODB_URI } = require('../config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Think Programming API - Stats Endpoint', function () {
  function clearDB(){
    return Promise.all([
      User.remove().exec(),
      GameQuestions.remove().exec(),
      UserStats.remove().exec()
    ]);
  }
  before(function () {
      // var options = {
      //   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
      //   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
      // };
      // return mongoose.connect(TEST_MONGODB_URI, options);
      return mongoose.connect(TEST_MONGODB_URI);
  });
  
  let userId = "000000000000000000000001";
  let token;
  let token2;
  let user;
  let badUser = { name: 'badUser',
      username: 'badUser',
      id: '000000000000000000000009' }
    
  beforeEach(async function () {
    await clearDB();
    return await Promise.all([
      User.insertMany(seedUsers),
      GameQuestions.insertMany(seedQuestions),
      UserStats.insertMany(seedStats),
      User.createIndexes(),
      GameQuestions.createIndexes(),
      UserStats.createIndexes()
    ])
    .then(([users]) => {
      user = users[0];
      token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
      token2 = jwt.sign({ badUser }, JWT_SECRET, { subject: user.username });
    });
  });
  
  afterEach(function () {
    return clearDB();
  });

  after(function () {
    return mongoose.disconnect();
  });
  /*=====STATS ENDPOINT=====*/

  /*=====GET: /mystats=====*/
  describe('/api/stats/mystats', function () {
    describe('GET', function () {
      it('should return stats object', function () {
        return chai
          .request(app)
          .get('/api/stats/mystats')
          .set('Authorization', `Bearer ${token}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect', 'totalIncorrect', 'correctPercentage','javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect', 'javascriptCorrectPercentage','javascriptTotalPoints', 'htmlTotalAnswered', 'htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect', 'cssCorrectPercentage', 'cssTotalPoints','dsaTotalAnswered', 'dsaTotalCorrect', 'dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
            expect(res.body._id).to.equal('000000000000000000000004');
            expect(res.body.userId).to.equal('000000000000000000000001');
            expect(res.body.username).to.equal('bobuser');
          });
      });
      it('should return error if stats object', function () {
        return chai
          .request(app)
          .get('/api/stats/mystats')
          .set('Authorization', `Bearer ${token2}`)
          .then(res => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('name', 'message', 'status');
            expect(res.body.name).to.equal('AuthenticationError');
            expect(res.body.message).to.equal('Unauthorized');
            expect(res.body.status).to.equal(401);
          });
      });         
    });
  });
});