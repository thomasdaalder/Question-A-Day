const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// View profile with the matching blog posts
router.get('/', function(req, res) {
    const userSession = req.session.user;
    db.Post.findAll({
            where: {
                userId: userSession.id
            }
        })
        .then(function(blogsByUser) {
            var allPoints = 0
            for (var i = 0; i < blogsByUser.length; i++) {
                // Adding up the total result
                allPoints += parseInt(blogsByUser[i].point) / blogsByUser.length;
                var allPoints = Math.round(allPoints)
            }

            res.render('profile', {
                specificBlogs: blogsByUser,
                user: userSession,
                allPoints: allPoints
            })
        })
})

module.exports = router;
