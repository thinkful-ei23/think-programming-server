// 'use strict';
// const User = require('./../models/user');
// const seedUsers = require('../db/seed/users');
// const GameQuestions = require('../models/gameQuestions');
// const seedQuestions = require('../db/seed/gameQuestions');
// const UserStats = require('../models/userStats');
// const seedStats = require('../db/seed/userStats');

// const app = require('../server');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');

// const { TEST_MONGODB_URI } = require('../config');
// const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = require('../config');
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('Think Programming API - GameRoom Endpoint', function () {
//   before(async function () {
//     // var options = {
//     //   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//     //   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
//     // };
//     return await mongoose.connect(TEST_MONGODB_URI).then(() => mongoose.connection.db.dropDatabase());
//   });
//   let userId = "000000000000000000000001";
//   let token;
//   let user;
  
//   beforeEach(async function () {
//     return await Promise.all([
//       User.insertMany(seedUsers),
//       GameQuestions.insertMany(seedQuestions),
//       UserStats.insertMany(seedStats)
//     ])
//     .then(([users]) => {
//       Promise.all([
//         User.createIndexes(),
//         GameQuestions.createIndexes(),
//         UserStats.createIndexes()
//       ]);
//       return users;
//     })
//     .then(users => {
//       user = users[0];
//       token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
//     });
//   });

//   afterEach(function () {
//     return mongoose.connection.db.dropDatabase();
//   });

//   after(function () {
//     return mongoose.disconnect();
//   });
//   // before(function () {
//   //   var options = {
//   //     server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//   //     replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
//   //   };
//   //   return mongoose.connect(TEST_MONGODB_URI, options);
//   // });
//   // let userId = "000000000000000000000001";
//   // let token;
//   // let user;
  
//   // beforeEach(async function () {
//   //   await mongoose.connection.db.dropDatabase()
//   //   const promises = await Promise.all([
//   //         User.insertMany(seedUsers),
//   //         GameQuestions.insertMany(seedQuestions),
//   //         UserStats.insertMany(seedStats),
//   //         User.createIndexes(),
//   //         GameQuestions.createIndexes(),
//   //         UserStats.createIndexes()
//   //       ]);
//   //   const users = promises[0];
//   //   user = users[0];
//   //   token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
//   // });

//   // afterEach(function () {
//   //     return mongoose.connection.db.dropDatabase();
//   // });

//   // after(async function () {
//   //   await User.ensureIndexes(),
//   //   await GameQuestions.ensureIndexes(),
//   //   await UserStats.ensureIndexes()
//   //   return mongoose.disconnect();
//   // });
//   /*=====GAMEROOM ENDPOINT=====*/

//   /*=====GET: Questions=====*/
//   describe('/api/gameRoom/questions', function () {
//     describe('GET', function () {
//       it('should get a question when given a `jsQuestions` as question and an index within questions', function () {
//         const questionType = 'jsQuestions';
//         const index = 0;
//         let res;
        
//         return chai
//           .request(app)
//           .get('/api/gameroom/questions')
//           .set('Authorization', `Bearer ${token}`)
//           .query({ question: questionType, num: index })
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('num', 'title', 'question');
//             expect(res.body.num).to.equal(0);
//             expect(res.body.title).to.equal('Write A Function');
//             expect(res.body.question).to.equal('Write a function called \'test\' which takes a and b as arguments.  The function should return a');
//           });
//       });      
//     });
//     describe('GET', function () {
//       it('should get a question when given a `htmlQuestions` as question and an index within questions', function () {
//         const questionType = 'htmlQuestions';
//         const index = 0;
//         let res;
        
//         return chai
//           .request(app)
//           .get('/api/gameroom/questions')
//           .set('Authorization', `Bearer ${token}`)
//           .query({ question: questionType, num: index })
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('num', 'title', 'question');
//             expect(res.body.num).to.equal(0);
//             expect(res.body.title).to.equal('Titles with h1');
//             expect(res.body.question).to.equal('Using an h1 element write \'My first HTML title\'');
//           });
//       });      
//     });
//     describe('GET', function () {
//       it('should get a question when given a `cssQuestions` as question and an index within questions', function () {
//         const questionType = 'cssQuestions';
//         const index = 0;
//         let res;
        
//         return chai
//           .request(app)
//           .get('/api/gameroom/questions')
//           .set('Authorization', `Bearer ${token}`)
//           .query({ question: questionType, num: index })
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('num', 'title', 'question');
//             expect(res.body.num).to.equal(0);
//             expect(res.body.title).to.equal('Comments in CSS');
//             expect(res.body.question).to.equal('Use the correct CSS syntax to write a short comment on what this does: `p { color: red }`');
//           });
//       });      
//     });
//     describe('GET', function () {
//       it('should get a question when given a `cssQuestions` as question and an index within questions', function () {
//         const questionType = 'dsaQuestions';
//         const index = 0;
//         let res;
        
//         return chai
//           .request(app)
//           .get('/api/gameroom/questions')
//           .set('Authorization', `Bearer ${token}`)
//           .query({ question: questionType, num: index })
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('num', 'title', 'question');
//             expect(res.body.num).to.equal(0);
//             expect(res.body.title).to.equal('Constant Time');
//             expect(res.body.question).to.equal('What is the constant time complexity in terms of Big-O notation?');
//           });
//       });      
//     });
//     describe('GET', function () {
//       it('should return error if there is no question type sent in requeset', function () {
//         const questionType = '';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .get('/api/gameroom/questions')
//           .set('Authorization', `Bearer ${token}`)
//           .query({ question: questionType, num: index })
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.eql({ status: 400, message: 'missing `questionType` in request' });
//           });
//       });
//     });
//     describe('GET', function () {
//       it('should return error if there is no num for question index sent in requeset', function () {
//         const questionType = 'htmlQuestions';
//         let index;
//         let res;
//         return chai
//           .request(app)
//           .get('/api/gameroom/questions')
//           .set('Authorization', `Bearer ${token}`)
//           .query({ question: questionType, num: index })
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.eql({ status: 400, message: 'missing `question number` in request' });
//           });
//       });
//     });
//     describe('GET', function () {
//       it('should return error if question type sent does not exist', function () {
//         const questionType = 'badQuestionType';
//         let index = 0;
//         let res;
//         return chai
//           .request(app)
//           .get('/api/gameroom/questions')
//           .set('Authorization', `Bearer ${token}`)
//           .query({ question: questionType, num: index })
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.eql({ status: 400, message: 'bad request: `question type` requested does not exist' });
//           });
//       });
//     });
//   });
//   /*=====POST /gameRoom/answers/jsQuestions ENDPOINT=====*/
//   describe('/api/gameRoom/answers/jsQuestions/:num', function () {
//     /*======Javascript Question 1======*/
//     describe('POST jsQuestion 1', function () {
//       // "title": "Write A Function",
//       // "question": "Write a function called test, which takes a and b as arguments.  The function should return a"
//       it('should run the JavaScript test on the string being sent associated with the question number', function () {
//         const answer = 'function test(a,b) { return a;}';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return error when answer does not contain the word `function`', function () {
//         const answer = 'test(a,b) { return a;}';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer not a valid function');
//           });
//       });
//       it('should return error when answer does not contain the `() parenthesis`', function () {
//         const answer = 'function test a,b { return a;}';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer not a valid function');
//           });
//       });
//       it('should return error when answer does not contain the `{} curly braces`', function () {
//         const answer = 'function test(a,b)  return a;';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return 400 error when answer does not contain any data', function () {
//         let answer;
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('status', 'message');
//             expect(res.body.message).to.eql('missing `answer` in request');
//           });
//       });
//       it('Should reject requests with unauthorized token sent with request', function () {
//         token = '1234badtoken';
//         const answer = 'function test(a,b) { return a;}';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(401);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('name', 'message', 'status');
//             expect(res.body.name).to.eql('AuthenticationError');
//             expect(res.body.message).to.eql('Unauthorized');
//           });
//       });
//       it('Should pass basic validation and run unsucessfully through function validation', function () {
//         const answer = 'function () {}';
//         let index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======Javascript Question 2======*/
//     describe('POST jsQuestion 2', function () {
//       // "title": "Functions that Add",
//       // "question": "Write a function called add that takes two arguments, num1 and num2.  Return the product of the two arguments."
//       it('should return `error: false` and `message: Challenge completed` for correct answer', function () {
//         const answer = 'function add(num1, num2) {return num1 * num2}';
//         const index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: false` and `message: Challenge completed` when sending different function name', function () {
//         const answer = 'function diff(num1, num2) {return num1 * num2}';
//         const index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: false` and `message: Challenge completed` when sending  different `argument names`', function () {
//         const answer = 'function add(a, b) {return a * b}';
//         const index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return 400 error when answer does not contain any data', function () {
//         let answer;
//         const index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('status', 'message');
//             expect(res.body.message).to.eql('missing `answer` in request');
//           });
//       });
//       it('Should pass basic validation and run unsucessfully through function validation', function () {
//         const answer = 'function () {}';
//         let index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======Javascript Question 3======*/
//     describe('POST jsQuestion 3', function () {
//       // "title": "Length of Arrays",
//       // "question": "Code a function called 'arrayLength' that takes an 'array' as an argument.  The function should return the length of the array."
//       it('should return `error: false` and `message: Challenge completed` for correct answer', function () {
//         let dataBefore;
//         const answer = 'function arrayLength(array) {return array.length;}';
//         const index = 2;
//         let res;
//         return Promise.all([
//           UserStats.findOne({ userId }),
//           chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//         ])
//         .then(([data, res]) => {
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//             dataBefore = data;
//             return UserStats.findOne({ userId})
//           })
//         .then(dataAfter => {
//           expect(dataBefore.userId).to.eql(dataAfter.userId);
//           expect(dataBefore.id).to.eql(dataAfter.id);
//           expect(dataBefore.username).to.eql(dataAfter.username);
//         }) 
//       });
//       it('should return `error: false` and `message: Challenge completed` when sening a different function name', function () {
//         const answer = 'function diffName(array) {return array.length;}';
//         const index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');

//           });
//       });
//       it('should return `error: false` and `message: Challenge completed` when sening a different `argument names`', function () {
//         const answer = 'function arrayLength(DIF) {return DIF.length;}';
//         const index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return 400 error when answer does not contain any data', function () {
//         let answer;
//         const index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('status', 'message');
//             expect(res.body.message).to.eql('missing `answer` in request');
//           });
//       });
//       it('Should pass basic validation and run unsucessfully through function validation', function () {
//         const answer = 'function () {}';
//         let index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======Javascript Question 4======*/
//     describe('POST jsQuestion 4', function () {
//       // "title": "Last Index of Array",
//       // "question": "Write a function called `findLast` which takes an array as an argument. This function should return the last item in the array."
//       it('should return `error: false` and `message: Challenge completed` for correct answer', function () {
//         const answer = 'function findLast(array) {return array[array.length - 1];}';
//         const index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: false` and `message: Challenge completed` when sening a different function name', function () {
//         const answer = 'function diffName(array) {return array[array.length - 1];}';
//         const index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: false` and `message: Challenge completed` when sening a different `argument names`', function () {
//         const answer = 'function findLast(diffName) {return diffName[diffName.length - 1];}';
//         const index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return 400 error when answer does not contain any data', function () {
//         let answer;
//         const index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('status', 'message');
//             expect(res.body.message).to.eql('missing `answer` in request');
//           });
//       });
//       it('Should pass basic validation and run unsucessfully through function validation', function () {
//         const answer = 'function () {}';
//         let index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======Javascript Question 5======*/
//     describe('POST jsQuestion 5', function () {
//       // "title": "Count Characters in a String",
//       // "question": "Given a `string` input and a `character`, the function 'countCharacter' returns the number of occurrences of a given character in the given string."
//       it('should return `error: false` and `message: Challenge completed` for correct answer', function () {
//         const answer = 'function countCharacter(str, character) {return (str.split(character).length - 1);}';
//         const index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: false` and `message: Challenge completed` when sening a different function name', function () {
//         const answer = 'function diffName(str, character) {return (str.split(character).length - 1);}';
//         const index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: false` and `message: Challenge completed` when sening a different `argument names`', function () {
//         const answer = 'function countCharacter(a, b) {return (a.split(b).length - 1);}';
//         const index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return 400 error when answer does not contain any data', function () {
//         let answer;
//         const index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('status', 'message');
//             expect(res.body.message).to.eql('missing `answer` in request');
//           });
//       });
//       it('Should pass basic validation and run unsucessfully through function validation', function () {
//         const answer = 'function () {}';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/jsQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//   });
//   /*======HTML Answers======*/
//   describe('/api/gameRoom/answers/htmlQuestions/:num', function () {
//     /*======HTML Question 1======*/
//     describe('POST htmlQuestion 1', function () {
//       // "title": "Titles with h1",
//       // "question": "Using an h1 element write 'My first HTML title'"
//       it('should run the HTML test on the string being sent', function () {
//         const answer = '<h1>My first HTML title</h1>';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return error when answer does not contain open and closing `<>`', function () {
//         const answer = 'h1 My first HTML h1';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer not valid html');
//           });
//       });
//       it('should return error when question number does not exist', function () {
//         const answer = '<h1>My first HTML title<h1>';
//         const index = 1000;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('message', 'status', 'location');
//             expect(res.body.status).to.eql(400);
//             expect(res.body.message).to.eql('question number does not exist');
//             expect(res.body.location).to.eql('POST api/gameRoom/answers/htmlQuestions/:num');
//           });
//       });
//       it('should return error question number is blank', function () {
//         const answer = '<h1> My first HTML <h1>';
//         let index;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('message', 'status', 'location');
//             expect(res.body.status).to.eql(400);
//             expect(res.body.message).to.eql('missing `number` in request');
//             expect(res.body.location).to.eql('POST api/gameRoom/answers/htmlQuestions/:num');
//           });
//       });
//       it('should return error when answer is blank', function () {
//         const answer = '';
//         let index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('message', 'status', 'location');
//             expect(res.body.status).to.eql(400);
//             expect(res.body.message).to.eql('missing `answer` in request');
//             expect(res.body.location).to.eql('POST api/gameRoom/answers/htmlQuestions/:num');
//           });
//       });
//     });
//     /*======HTML Question 2======*/
//     describe('POST htmlQuestion 2', function () {
//       // "title": "Link To JQuery",
//       // "question": "Use script tags to link to the jQuery CDN.  Here is the address for the jQuery CDN: 'jquery-3.3.1.min.js'... hint! hint! use the src attribute to link the libary"
//       it('should return error false and message `Challenge Completed` when sending correct answer to question 2 (index 1)', function () {
//         const answer = '<script src="jquery-3.3.1.min.js"></script>';
//         let index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return error true and message `Answer incorrect` when sending answer to question 2 (index 1) missing the `jquery-3.3.1.min.js` in src attr', function () {
//         const answer = '<script src></script>';
//         let index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error true and message `Answer is incorrect` when sending answer to question 2 (index 1) missing the `src` attr', function () {
//         const answer = '<script class="jquery-3.3.1.min.js"></script>';
//         let index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error true and message `Answer is incorrect` when sending answer to question 2 (index 1) with element other than `script`', function () {
//         const answer = '<p src="jquery-3.3.1.min.js"></p>';
//         let index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======HTML Question 3======*/
//     describe('POST htmlQuestion 3', function () {
//       // "title": "Add an HTML Link",
//       // "question": "Using an `a` element add a link to 'https://think-programming-client.herokuapp.com'. make the links text say 'Think Programming' and use the href attribute inside of the a tags."
//       it('should return error false and message `Challenge Completed` when sending correct answer to question 3 (index 2)', function () {
//         const answer = '<a href="https://think-programming-client.herokuapp.com">Think Programming</a>';
//         let index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return error true and message `Answer incorrect` when sending answer to question 3 (index 2) missing the `correct href` in href attr', function () {
//         const answer = '<a href="www.google.com">Think Programming</a>';
//         let index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error true and message `Answer is incorrect` when sending answer to question 3 (index 2) missing the `href` attr', function () {
//         const answer = '<a src="https://think-programming-client.herokuapp.com">Think Programming</a>';
//         let index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error true and message `Answer is incorrect` when sending answer to question 3 (index 2) with element other than `a`', function () {
//         const answer = '<img href="https://think-programming-client.herokuapp.com">Think Programming</img>';
//         let index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error true and message `Answer is incorrect` when sending answer to question 3 (index 2) with incorrect text inside element', function () {
//         const answer = '<a href="https://think-programming-client.herokuapp.com">Wrong Text</a>';
//         let index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======HTML Question 4======*/
//     describe('POST htmlQuestion 4', function () {
//       // "title": "Adding a class to an HTML element",
//       // "question": "Make an h2 element with a class of 'think-programming-title' and the text 'Think Programming'"
//       it('should return error false and message `Challenge Completed` when sending correct answer to question 4 (index 3)', function () {
//         let answer = '<h2 class="think-programming-title" >Think Programming</h2>';
//         let index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return error true and message `Answer incorrect` when sending answer to question 4 (index 3) missing the correct `class`', function () {
//         const answer = '<h2 class="wrong class">Think Programming<h2>';
//         let index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error true and message `Answer is incorrect` when sending answer to question 4 (index 3) with incorrect `attr`', function () {
//         const answer = '<h2 src="think-programming-title">Think Programming<h2>';
//         let index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 4 (index 3) with element other than `h2`', function () {
//         const answer = '<p class="think-programming-title">Think Programming<p>';
//         let index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 4 (index 3) with incorrect text inside element', function () {
//         const answer = '<h2 class="think-programming-title">bad text<h2>';
//         let index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======HTML Question 5======*/
//     describe('POST htmlQuestion 5', function () {
//       // "title": "Unordered Lists",
//       // "question": "Make an Unordered List with two list items.  There should be a class of `my-list` on the UL.  the first li element should `learn to program` as its text and the second li should have the text, `become a developer`.  the first li should have a key attribute equal to 1 and the second with a key attribute equal to 2."
//       it('should return error false and message `Challenge Completed` when sending correct answer to question 5 (index 4)', function () {
//         let answer = '<ul class="my-list"><li key="1">learn to program</li><li key="2">become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return error true and message `Answer incorrect` when sending answer to question 5 (index 4) missing the correct `class`', function () {
//         const answer = '<ul class="INCORRECT-CLASS"><li key="1">learn to program</li><li key="2">become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error true and message `Answer is incorrect` when sending answer to question 4 (index 3) with incorrect `attr`', function () {
//         const answer = '<ul inc="my-list"><li key="1">learn to program</li><li key="2">become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) with element other than `ul`', function () {
//         const answer = '<div class="my-list"><li key="1">learn to program</li><li key="2">become a developer</li></div>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) with incorrect text inside first `li` element', function () {
//         const answer = '<ul class="my-list"><li key="1">INCORRECT TEXT</li><li key="2">become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) with incorrect text inside second `li` element', function () {
//         const answer = '<ul class="my-list"><li key="1">learn to program</li><li key="2">INCORRECT TEXT</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) with more than 2 `li` elements', function () {
//         const answer = '<ul class="my-list"><li key="1">learn to program</li><li>TOO MANY LIs</li><li key="2">become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) with less than 2 `li` elements', function () {
//         const answer = '<ul class="my-list"><li key="1">learn to program</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) incorrect `key #` on first `li`', function () {
//         const answer = '<ul class="my-list"><li key="WRONG KEY">learn to program</li><li key="2">become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) incorrect `key #` on second `li`', function () {
//         const answer = '<ul class="my-list"><li key="1">learn to program</li><li key="WRONG KEY">become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) with missing `key` attribute on first `li`', function () {
//         const answer = '<ul class="my-list"><li>learn to program</li><li key="2">become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error `true` and message `Answer is incorrect` when sending answer to question 5 (index 4) with missing `key` attribute on second `li`', function () {
//         const answer = '<ul class="my-list"><li key="1">learn to program</li><li>become a developer</li></ul>';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/htmlQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//   });
//   /*======CSS Answers======*/
//   describe('/api/gameRoom/answers/cssQuestions/:num', function () {
//     /*======CSS Answer Endpoint validations======*/
//     describe('POST checking for missing or incorrect userId, missing number, missing answer', function () {
//       it('should return 401 Unauthorized error if bad token is sent', function () {
//         token = 'badToken';
//         const answer = '/* bla bla bla */';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(401);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('name', 'message', 'status');
//             expect(res.body.status).to.eql(401);
//             expect(res.body.name).to.eql('AuthenticationError');
//             expect(res.body.message).to.eql('Unauthorized');
//           });
//       });
//       it('should return 400 error if question number is missing', function () {
//         const answer = '/* bla bla bla */';
//         let index;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('message', 'status', 'location');
//             expect(res.body.status).to.eql(400);
//             expect(res.body.location).to.eql('POST api/gameRoom/answers/cssQuestions/:num');
//             expect(res.body.message).to.eql('missing `number` in request');
//           });
//       });
//       it('should return 400 error if question answer is undefined', function () {
//         let answer;
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('message', 'status', 'location');
//             expect(res.body.status).to.eql(400);
//             expect(res.body.location).to.eql('POST api/gameRoom/answers/cssQuestions/:num');
//             expect(res.body.message).to.eql('missing `answer` in request');
//           });
//       });
//     });
//     /*======CSS Question 1======*/
//     describe('POST cssQuestion 1', function () {
//       // "title": "Comments in CSS",
//       // "question": "Use the correct CSS syntax to write a short comment on what this does: `p { color: red }`"
//       it('should run successful test on the string being sent', function () {
//         const answer = '/* bla bla bla */';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return error when css answer only contains open  `/*` and not `*/`', function () {
//         const answer = '/* and thats it';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//       it('should return error when css answer only contains open  `*/` and not `/*`', function () {
//         const answer = 'and thats it */';
//         const index = 0;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error', 'message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });  
//     /*======CSS Question 2======*/
//     describe('POST cssQuestion 2', function () {
//       // "title": "Background Color",
//       // "question": "Which property is used to change the background color? (Options: color, background, background-color, bgcolor)"
//       it('should successfully return `error: false` and `message `Challenge Completed`` when sending correct answer to question 2 (index 1)', function () {
//         const answer = 'background-color';
//         let index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: true` and message: `Answer is incorrect` when sending incorrect answer to question 2 (index 1)', function () {
//         const answer = 'incorrect answer';
//         let index = 1;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======CSS Question 3======*/
//     describe('POST cssQuestion 3', function () {
//       // "title": "Text Size",
//       // "question": "Which CSS property controls the text size? (Options: text-style, font-style, font-size, text-size)"
//       it('should successfully return `error: false` and `message `Challenge Completed`` when sending correct answer to question 3 (index 2)', function () {
//         const answer = 'font-size';
//         let index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: true` and `message: `Answer is incorrect` when sending incorrect answer to question 3 (index 2)', function () {
//         const answer = 'incorrect answer';
//         let index = 2;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======CSS Question 4======*/
//     describe('POST cssQuestion 4', function () {
//       // "title": "<p> Element",
//       // "question": "Use the correct CSS syntax to make all the <p> elements bold"
//       it('should successfully return `error: false` and `message `Challenge Completed`` when sending correct answer to question 4 (index 3)', function () {
//         const answer = 'p { font-weight: bold; }';
//         let index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: true` and `message: `Answer is incorrect` when sending incorrect answer to question 4 (index 3)', function () {
//         const answer = 'incorrect answer';
//         let index = 3;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//     /*======CSS Question 5======*/
//     describe('POST cssQuestion 5', function () {
//       // "title": "Position Property",
//       // "question": "What is the default value of the position property? (Options: relative, absolute, static, fixed)"
//       it('should successfully return `error: false` and `message `Challenge Completed`` when sending correct answer to question 5 (index 4)', function () {
//         const answer = 'static';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(false);
//             expect(res.body.message).to.eql('Challenge completed');
//           });
//       });
//       it('should return `error: true` and `message: `Answer is incorrect` when sending incorrect answer to question 5 (index 4)', function () {
//         const answer = 'incorrect answer';
//         let index = 4;
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/answers/cssQuestions/${index}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({answer})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('error','message');
//             expect(res.body.error).to.eql(true);
//             expect(res.body.message).to.eql('Answer is incorrect');
//           });
//       });
//     });
//   });
//   /*======POST Approve/Deny Judgment Endpoint======*/
//   describe('/api/gameRoom/judgment/:room', function () {
//     /*======First Test Endpoint Validations======*/
//     describe('POST checking for missing or incorrect data', function () {
//       it('Should reject requests with unauthorized token sent with request', function () {
//         token = '1234badtoken';
//         const verdict = 'correct';
//         const room = 'jsQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(401);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('name', 'message', 'status');
//             expect(res.body.name).to.eql('AuthenticationError');
//             expect(res.body.message).to.eql('Unauthorized');
//           });
//       });
//       it('should return `400 missing room in request` if no params are sent with request', function () {
//         const verdict = 'correct';
//         const room = 'not-valid';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('status', 'message', 'location');
//             expect(res.body.status).to.eql(400);
//             expect(res.body.message).to.eql('bad request: `room` requested does not exist');
//             expect(res.body.location).to.eql('POST api/gameRoom/judgment/:room');
//           });
//       });
//     });
//     /*======RoomType jsQuestions Judgment Validations======*/
//     describe('POST jsQuestions', function () {
//       it('Should return 200 status when sending existing room and `correct` verdict', function () {
//         const verdict = 'correct';
//         const room = 'jsQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect','totalIncorrect', 'correctPercentage', 'javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect','javascriptCorrectPercentage', 'javascriptTotalPoints', 'htmlTotalAnswered','htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect','cssCorrectPercentage', 'cssTotalPoints', 'dsaTotalAnswered', 'dsaTotalCorrect','dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
//           });
//       });
//       it('Should return 200 status when sending existing room and `incorrect` verdict', function () {
//         const verdict = 'incorrect';
//         const room = 'jsQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect','totalIncorrect', 'correctPercentage', 'javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect','javascriptCorrectPercentage', 'javascriptTotalPoints', 'htmlTotalAnswered','htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect','cssCorrectPercentage', 'cssTotalPoints', 'dsaTotalAnswered', 'dsaTotalCorrect','dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
//           });
//       });
//     });
//     /*======RoomType htmlQuestions Judgment Validations======*/
//     describe('POST htmlQuestions', function () {
//       it('Should return 200 status when sending existing room and `correct` verdict', function () {
//         const verdict = 'correct';
//         const room = 'htmlQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect','totalIncorrect', 'correctPercentage', 'javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect','javascriptCorrectPercentage', 'javascriptTotalPoints', 'htmlTotalAnswered','htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect','cssCorrectPercentage', 'cssTotalPoints', 'dsaTotalAnswered', 'dsaTotalCorrect','dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
//           });
//       });
//       it('Should return 200 status when sending existing room and `incorrect` verdict', function () {
//         const verdict = 'incorrect';
//         const room = 'htmlQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect','totalIncorrect', 'correctPercentage', 'javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect','javascriptCorrectPercentage', 'javascriptTotalPoints', 'htmlTotalAnswered','htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect','cssCorrectPercentage', 'cssTotalPoints', 'dsaTotalAnswered', 'dsaTotalCorrect','dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
//           });
//       });
//     });
//     /*======RoomType cssQuestions Judgment Validations======*/
//     describe('POST cssQuestions', function () {
//       it('Should return 200 status when sending existing room and `correct` verdict', function () {
//         const verdict = 'correct';
//         const room = 'cssQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect','totalIncorrect', 'correctPercentage', 'javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect','javascriptCorrectPercentage', 'javascriptTotalPoints', 'htmlTotalAnswered','htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect','cssCorrectPercentage', 'cssTotalPoints', 'dsaTotalAnswered', 'dsaTotalCorrect','dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
//           });
//       });
//       it('Should return 200 status when sending existing room and `incorrect` verdict', function () {
//         const verdict = 'incorrect';
//         const room = 'cssQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect','totalIncorrect', 'correctPercentage', 'javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect','javascriptCorrectPercentage', 'javascriptTotalPoints', 'htmlTotalAnswered','htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect','cssCorrectPercentage', 'cssTotalPoints', 'dsaTotalAnswered', 'dsaTotalCorrect','dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
//           });
//       });
//     });
//     /*======RoomType dsaQuestions Judgment Validations======*/
//     describe('POST dsaQuestions', function () {
//       it('Should return 200 status when sending existing room and `correct` verdict', function () {
//         const verdict = 'correct';
//         const room = 'dsaQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect','totalIncorrect', 'correctPercentage', 'javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect','javascriptCorrectPercentage', 'javascriptTotalPoints', 'htmlTotalAnswered','htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect','cssCorrectPercentage', 'cssTotalPoints', 'dsaTotalAnswered', 'dsaTotalCorrect','dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
//           });
//       });
//       it('Should return 200 status when sending existing room and `incorrect` verdict', function () {
//         const verdict = 'incorrect';
//         const room = 'dsaQuestions';
//         let res;
//         return chai
//           .request(app)
//           .post(`/api/gameroom/judgment/${room}`)
//           .set('Authorization', `Bearer ${token}`)
//           .send({verdict})
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.all.keys('totalPoints', 'totalAnswered', 'totalCorrect','totalIncorrect', 'correctPercentage', 'javascriptTotalAnswered', 'javascriptTotalCorrect', 'javascriptTotalIncorrect','javascriptCorrectPercentage', 'javascriptTotalPoints', 'htmlTotalAnswered','htmlTotalCorrect', 'htmlTotalIncorrect', 'htmlCorrectPercentage','htmlTotalPoints', 'cssTotalAnswered', 'cssTotalCorrect', 'cssTotalIncorrect','cssCorrectPercentage', 'cssTotalPoints', 'dsaTotalAnswered', 'dsaTotalCorrect','dsaTotalIncorrect', 'dsaCorrectPercentage', 'dsaTotalPoints', '_id', 'userId','username', '__v');
//           });
//       });
//     });
//   });
// });