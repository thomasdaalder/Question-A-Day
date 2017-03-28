const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

function userAnsweredWithinADay(req){
  var today = new Date();
  var oneDayInMilliseconds = -60000 //1 second - 1
  // * 1 //one minute - 60
  // * 1 //one hour - 60
  // * 1 //one day - 24
  console.log('userAnsweredWithinADay')
  console.log('req.session.dateNow, today, req.session.dateNow - today, oneDayInMilliseconds')
  console.log(req.session.dateNow, today, new Date(req.session.dateNow) - new Date(today), oneDayInMilliseconds)
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  console.log('on URL: ' + fullUrl)
  if(new Date(req.session.dateNow) - new Date(today) > oneDayInMilliseconds){
    console.log('userAnsweredWithinADay true')
    return true
  }
  else {
    console.log('userAnsweredWithinADay false')
    return false
  }
}

// Create Post (GET)

router.get('/', function(req, res) {
    const userSession = req.session.user;
  if (req.session.user === undefined) {
      res.redirect('/')
      return
  }
  if (userAnsweredWithinADay(req)){
      const userSession = req.session.user;
      res.render('alreadyAnswered', {
        user: userSession
      })
      return
  }
  else{
    var today = new Date();
    const userSession = req.session.user;
    db.Timer.findOne()
        .then(function(timer) {
            db.Question.findOne({
                    where: {
                        id: timer.value
                    }
                })
                .then((allQuestions) => {
                    res.render('createPost', {
                        user: userSession,
                        allQuestions: allQuestions
                    });
                })
        })
        .catch(e => console.log(e))
  }
})


// Submitting a BLOG (POST)
router.post('/', function(req, res) {
    const userSession = req.session.user;
    db.User.findOne({
            where: {
                id: userSession.id
            }
        })
        .then(function(user) {
            return user.createPost({
                title: req.body.titleInput,
                body: req.body.q17,
                point: req.body.pointInput
            })
        })
        .then(function() {
            req.session.dateNow = new Date();
            res.redirect('/profile');
        });
})

module.exports = router;
