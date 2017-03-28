const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');

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


// Index page that renders all blog posts
router.get('/', (req, res) => {
    const userSession = req.session.user
    if (userAnsweredWithinADay(req)){
        const userSession = req.session.user;
        res.render('alreadyAnswered', {
          user: userSession
        })
        return
    }
    else{
    db.Post.findAll()
        .then((allPosts) => {
            res.render('index', {
                blogList: allPosts,
                user: userSession
            })
        })
    }
})

module.exports = router;
