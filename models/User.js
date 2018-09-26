const mongoose = require('mongoose');
const Joi = require('Joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = function() {
    //trzeba to dodac do methods, a pozniej wywolac prosto z user
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'), {
        expiresIn: 3600
    });
};

const User = mongoose.model('user', userSchema);

function validateUser(user) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const schema = {
        name: Joi.string()
            .min(3)
            .max(40)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .max(40)
            .regex(regex, 'password verification')
            .required(),
        avatar: Joi.string(),
        date: Joi.date()
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
exports.validate = validateUser;
