const express = require('express');
const users = require('../routes/api/users');
const profile = require('../routes/api/profile');
const posts = require('../routes/api/posts');
const errorMiddleware = require('../middleware/error.js');
const passport = require('passport');

//Middlewares and routes

require('../middleware/passportConf')(passport);

module.exports = function(app) {
    app.use(express.json());
    app.use(passport.initialize());
    app.use('/api/users', users);
    app.use('/api/profile', profile);
    app.use('/api/posts', posts);
    app.use(errorMiddleware);
};
