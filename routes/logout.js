const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// Logout that destroys the session
router.get('/', function (req, res) {
  req.session.destroy(function (error) {
    if(error) {
        throw error;
    }
      res.redirect( '/?message=' + encodeURIComponent("Succesfully logged out.") );
  })
})

module.exports = router;
