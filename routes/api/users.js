const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const Joi = require('Joi');
const express = require('express');
const passport = require('passport');
const router = express.Router();

const { User, validate } = require('../../models/User');

const validateRegisterInput = require('../../validators/register');
const validateLoginInput = require('../../validators/login');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => {
    res.json({
        msg: 'users test work'
    });
});

// @route   GET api/users/
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    res.send('1 user');
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    //const { error } = validate(req.body); // walidacja z Joi
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!valid.isValid) return res.status(400).json(valid.errors);

    let user = await User.findOne({ email: req.body.email });
    if (!!user) return res.status(400).send('User already registered');

    const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', //rating - wat is allowed on photo
        d: 'mm' //default option if picture on email is not present
    });

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatar
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.generateAuthToken();

    user = await user.save();
    res.header('-x-auth-token', token).send(user);
});

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    //const { error } = validateLogin(req.body);
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send(`Invalid email or no such user`);

    const isAuth = await bcrypt.compare(req.body.password, user.password);
    const token = user.generateAuthToken();

    if (isAuth)
        res.header('-x-auth-token', `Bearer ${token}`).send(`You're logged in`);
    else res.send('Invalid password');
});

// @route   GET api/users/current
// @desc    Get current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        res.json(req.user);
    }
);

function validateLogin(user) {
    const schema = {
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .max(40)
            .required()
    };

    return Joi.validate(user, schema);
}

module.exports = router;
