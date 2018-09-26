require('dotenv').config();

module.exports = {
    mongoUrl: process.env.MONGOURL,
    jwtPrivateKey: process.env.JWT
};
