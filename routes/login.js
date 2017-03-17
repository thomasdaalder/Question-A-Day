const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Inlog system that checks if user has filled in the correct username or password
router.post('/', bodyParser.urlencoded({extended: true}), function (req, res) {
    if(req.body.username.length === 0) {
        res.redirect('/?message=' + encodeURIComponent("Please fill out in your username."));
        return;
    }

    if(req.body.password.length === 0) {
       res.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
       return;
   }

   db.User.findOne({
    where: {
        username: req.body.username
    }
  })
  .then (function (user) {
    bcrypt.compare(req.body.password, user.password, function (err, hash) {
        if (hash === true) {
          req.session.user = user;
          res.redirect('/');
        }
        else {
          res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
        }
    })
  })
})
module.exports = router;
