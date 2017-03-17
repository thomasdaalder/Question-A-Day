const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// View profile with the matching blog posts
router.get('/', function(req, res) {
	const userSession = req.session.user;
	db.Post.findAll({ where: { userId: userSession.id } })
		.then(function(blogsByUser) {
			res.render('profile',
				{specificBlogs: blogsByUser,
				user: userSession})
			})
})

module.exports = router;
