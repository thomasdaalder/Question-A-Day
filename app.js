"use strict";

// Libraries
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pg = require('pg');
const db = require(__dirname + '/models/db.js')
const app = express();
const bcrypt = require('bcrypt');


// Including usage of routes
const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const profile = require('./routes/profile');
const createPost = require('./routes/createPost');
const grabBlog = require('./routes/grabBlog')

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
    secret: 'oh wow very secret much security',
    resave: true,
    saveUninitialized: false
}));

// Routes
app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/profile', profile)
app.use('/createPost', createPost)
app.use('/blog', grabBlog)

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Running server
app.listen(3000, () =>
	{console.log('Server running')
})

module.exports = app;
