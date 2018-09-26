const express = require('express');
require('dotenv').config();
const debug = require('debug')('app:startup');
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`Port is listening on ${port}`));
