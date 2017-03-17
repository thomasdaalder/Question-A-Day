const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// Create clickable link for unique Blog IDs
router.get('/:blogID', (req, res) => {
  const userSession = req.session.user;
  console.log('logging blogID')
  console.log(req.params.blogID)
  db.Post.findOne({
     where: {
         id: req.params.blogID
     },
     include: [db.Comment]
  })
  .then(function (postABlog) {
    res.render('grabBlog', {
      blogPost: postABlog,
  	  user: userSession,
      paramsID: req.params.blogID
    })
  })
  .catch(e => console.log(e))
})

// Submit comments under the specific blog ID
router.post('/:blogId', (req, res) => {
  const userSession = req.session.user;
  db.Post.findOne({
    where: {
      id: req.params.blogId
    }
  })
  .then(function (post) {
    post.createComment({
      username: req.body.username,
      body: req.body.comment
    })
  })
  .then(function() {
    res.redirect('/blog/' + req.params.blogId);
  })
  .catch(e => console.log(e))
})

module.exports = router;
