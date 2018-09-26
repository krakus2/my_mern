const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

//Connect to MongoDB
module.exports = function() {
    mongoose
        .connect(
            config.get('mongoUrl'),
            { useNewUrlParser: true }
        )
        .then(() => winston.info('MongoDB connected'));
};
