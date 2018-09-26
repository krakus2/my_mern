const winston = require('winston');
require('express-async-errors');

module.exports = function() {
    winston.add(winston.transports.File, { filename: 'logfile.log' });

    process
        .on('unhandledRejection', ex => {
            winston.error(ex);
        })
        .on('uncaughtException', ex => {
            winston.log('error', ex);
            process.exit(1);
        });
};
