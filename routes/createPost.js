const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// Create Post (GET)
router.get('/', function (req, res) {
  var randomNumber = Math.floor(Math.random() * (6 - 1)) + 1


  const userSession = req.session.user;
    db.Question.findOne({where: {id: randomNumber}})
    .then((allQuestions) => {
      console.log(allQuestions)
      res.render('createPost', {user: userSession,
      allQuestions: allQuestions});
    })
})


// Submitting a BLOG (POST)
router.post('/', function (req, res) {
  const userSession = req.session.user;

  db.User.findOne({
     where: {id: userSession.id}
    })
  .then(function(user) {
    return user.createPost({
        title: req.body.q17,
        body: req.body.q17,
        date: req.body.dateInput
    })
  })
  .then(function() {
    res.redirect('/');
  });
})

module.exports = router;
