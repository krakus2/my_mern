const mongoose = require('mongoose');
const Joi = require('Joi');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    handle: {
        type: String,
        required: true,
        maxlength: 40
    },
    company: String,
    website: String,
    location: String,
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String]
    },
    bio: String,
    githubusername: {
        type: String
    },
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        instagram: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('profile', userSchema);

module.exports.Profile = Profile;
