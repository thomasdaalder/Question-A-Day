const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// Index page that renders all blog posts
router.get('/', (req, res) => {
  const userSession = req.session.user
  db.Post.findAll()
  .then((allPosts) => {
    res.render('index',
    {blogList: allPosts,
    user: userSession
    })
  })
})

module.exports = router;
