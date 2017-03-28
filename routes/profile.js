const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// View profile with the matching blog posts
router.get('/', function(req, res) {
    const userSession = req.session.user;
    if (req.session.user === undefined) {
        res.redirect('/');
    } else {
        // du rest
    }
    
    db.Post.findAll({
            where: {
                userId: userSession.id
            }
        })
        .then(function(blogsByUser) {
            var allPoints = 0
            for (var i = 0; i < blogsByUser.length; i++) {
                // Adding up the total result
                allPoints += parseInt(blogsByUser[i].point)
                console.log("allPoints")
                console.log(allPoints)
            }
            var allPoints = (allPoints / blogsByUser.length)
            var averagePoints = Math.round(allPoints)

            res.render('profile', {
                specificBlogs: blogsByUser,
                user: userSession,
                allPoints: averagePoints
            })
        })
})

module.exports = router;
